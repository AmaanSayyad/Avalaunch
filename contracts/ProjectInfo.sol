// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ProjectInfo
 * @dev Contract for milestone-based funding projects with community governance
 */
contract ProjectInfo is Ownable, ReentrancyGuard {
    // Token used for funding and revenue (WAVAX on Avalanche)
    IERC20 public fundingToken;
    
    // Project details
    string public projectDataIPFS;
    address public projectOwnerAddress;
    uint256 public fundingRequired;
    uint256 public fundingRaiseDeadline;
    uint256 public projectOwnerRevenuePercent;
    uint256 public revenueGenerated;
    uint256 public totalInvestments;
    
    // Project status
    enum ProjectStatus { Funding, Active, Completed, Failed }
    ProjectStatus public status;
    
    // Milestone structure
    struct Milestone {
        string title;
        string description;
        string deliverables;
        uint256 fundingPercentage;
        uint256 fundingAmount;
        uint256 estimatedCompletion;
        bool completed;
        bool fundsReleased;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 votingDeadline;
        mapping(address => bool) hasVoted;
    }
    
    // Milestones array
    uint256 public milestoneCount;
    mapping(uint256 => Milestone) public milestones;
    
    // Investor mappings
    mapping(address => uint256) public investments;
    mapping(address => uint256) public investorVotingPower;
    address[] public investors;
    
    // Events
    event Invested(address indexed investor, uint256 amount);
    event MilestoneCreated(uint256 indexed milestoneId, string title, uint256 fundingAmount);
    event MilestoneVote(uint256 indexed milestoneId, address indexed voter, bool support);
    event MilestoneCompleted(uint256 indexed milestoneId);
    event MilestoneFundsReleased(uint256 indexed milestoneId, uint256 amount);
    event RevenueCollected(uint256 amount);
    event RevenueDistributed(uint256 investorsAmount, uint256 ownerAmount);

    /**
     * @dev Constructor for creating a new project
     * @param _projectDataIPFS IPFS hash containing all project details
     * @param _projectOwnerAddress Address of the project owner
     * @param _fundingRequired Total funding amount required for the project
     * @param _fundingRaiseDeadline Timestamp when funding period ends
     * @param _projectOwnerRevenuePercent Percentage of revenue that goes to project owner
     */
    constructor(
        string memory _projectDataIPFS,
        address _projectOwnerAddress,
        uint256 _fundingRequired,
        uint256 _fundingRaiseDeadline,
        uint256 _projectOwnerRevenuePercent
    ) Ownable(_projectOwnerAddress) {
        projectDataIPFS = _projectDataIPFS;
        projectOwnerAddress = _projectOwnerAddress;
        fundingRequired = _fundingRequired;
        fundingRaiseDeadline = _fundingRaiseDeadline;
        projectOwnerRevenuePercent = _projectOwnerRevenuePercent;
        status = ProjectStatus.Funding;
        
        // Set funding token to WAVAX on Avalanche C-Chain
        // For mainnet: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
        // For testnet (Fuji): 0xd00ae08403B9bbb9124bB305C09058E32C39A48c
        fundingToken = IERC20(0xd00ae08403B9bbb9124bB305C09058E32C39A48c); // Fuji Testnet WAVAX
    }

    /**
     * @dev Allows investors to fund the project
     * @param amount Amount to invest
     */
    function invest(uint256 amount) public nonReentrant {
        require(status == ProjectStatus.Funding, "Project is not in funding phase");
        require(block.timestamp <= fundingRaiseDeadline, "Funding deadline has passed");
        require(totalInvestments + amount <= fundingRequired, "Exceeds funding goal");
        require(fundingToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        // Update investor data
        if (investments[msg.sender] == 0) {
            investors.push(msg.sender);
        }
        
        investments[msg.sender] += amount;
        investorVotingPower[msg.sender] += amount;
        totalInvestments += amount;

        // Check if funding goal reached
        if (totalInvestments == fundingRequired) {
            status = ProjectStatus.Active;
        }

        emit Invested(msg.sender, amount);
    }

    /**
     * @dev Creates a new milestone
     * @param _title Title of the milestone
     * @param _description Description of the milestone
     * @param _deliverables Deliverables for the milestone
     * @param _fundingPercentage Percentage of total funding allocated to this milestone
     * @param _estimatedCompletion Estimated completion timestamp
     */
    function createMilestone(
        string memory _title,
        string memory _description,
        string memory _deliverables,
        uint256 _fundingPercentage,
        uint256 _estimatedCompletion
    ) public onlyOwner {
        require(status == ProjectStatus.Active, "Project must be active");
        
        // Calculate funding amount based on percentage
        uint256 fundingAmount = (fundingRequired * _fundingPercentage) / 100;
        
        // Create milestone
        Milestone storage newMilestone = milestones[milestoneCount];
        newMilestone.title = _title;
        newMilestone.description = _description;
        newMilestone.deliverables = _deliverables;
        newMilestone.fundingPercentage = _fundingPercentage;
        newMilestone.fundingAmount = fundingAmount;
        newMilestone.estimatedCompletion = _estimatedCompletion;
        newMilestone.completed = false;
        newMilestone.fundsReleased = false;
        newMilestone.votesFor = 0;
        newMilestone.votesAgainst = 0;
        
        emit MilestoneCreated(milestoneCount, _title, fundingAmount);
        
        milestoneCount++;
    }

    /**
     * @dev Submits a milestone for community voting
     * @param milestoneId ID of the milestone
     * @param votingPeriod Duration of voting period in seconds
     */
    function submitMilestoneForVoting(uint256 milestoneId, uint256 votingPeriod) public onlyOwner {
        require(milestoneId < milestoneCount, "Invalid milestone ID");
        require(!milestones[milestoneId].completed, "Milestone already completed");
        require(status == ProjectStatus.Active, "Project must be active");
        
        milestones[milestoneId].votingDeadline = block.timestamp + votingPeriod;
    }

    /**
     * @dev Allows investors to vote on milestone completion
     * @param milestoneId ID of the milestone
     * @param support True if supporting milestone completion, false otherwise
     */
    function voteOnMilestone(uint256 milestoneId, bool support) public {
        require(milestoneId < milestoneCount, "Invalid milestone ID");
        require(investorVotingPower[msg.sender] > 0, "No voting power");
        require(!milestones[milestoneId].hasVoted[msg.sender], "Already voted");
        require(block.timestamp <= milestones[milestoneId].votingDeadline, "Voting period ended");
        require(!milestones[milestoneId].completed, "Milestone already completed");
        
        if (support) {
            milestones[milestoneId].votesFor += investorVotingPower[msg.sender];
        } else {
            milestones[milestoneId].votesAgainst += investorVotingPower[msg.sender];
        }
        
        milestones[milestoneId].hasVoted[msg.sender] = true;
        
        emit MilestoneVote(milestoneId, msg.sender, support);
    }

    /**
     * @dev Finalizes milestone voting and releases funds if approved
     * @param milestoneId ID of the milestone
     */
    function finalizeMilestone(uint256 milestoneId) public {
        require(milestoneId < milestoneCount, "Invalid milestone ID");
        require(block.timestamp > milestones[milestoneId].votingDeadline, "Voting still in progress");
        require(!milestones[milestoneId].completed, "Milestone already completed");
        
        // Check if milestone is approved (50% or more votes in favor)
        uint256 totalVotes = milestones[milestoneId].votesFor + milestones[milestoneId].votesAgainst;
        require(totalVotes > 0, "No votes cast");
        
        if (milestones[milestoneId].votesFor * 100 / totalVotes >= 50) {
            // Milestone approved
            milestones[milestoneId].completed = true;
            
            // Release funds
            require(fundingToken.transfer(projectOwnerAddress, milestones[milestoneId].fundingAmount), "Transfer failed");
            milestones[milestoneId].fundsReleased = true;
            
            emit MilestoneCompleted(milestoneId);
            emit MilestoneFundsReleased(milestoneId, milestones[milestoneId].fundingAmount);
            
            // Check if all milestones are completed
            bool allCompleted = true;
            for (uint256 i = 0; i < milestoneCount; i++) {
                if (!milestones[i].completed) {
                    allCompleted = false;
                    break;
                }
            }
            
            if (allCompleted) {
                status = ProjectStatus.Completed;
            }
        }
    }

    /**
     * @dev Collects revenue for the project
     * @param amount Amount of revenue to collect
     */
    function collectRevenue(uint256 amount) public nonReentrant {
        require(fundingToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        revenueGenerated += amount;
        
        emit RevenueCollected(amount);
    }

    /**
     * @dev Distributes revenue between project owner and investors
     */
    function distributeRevenue() public nonReentrant {
        require(revenueGenerated > 0, "No revenue to distribute");
        
        // Calculate shares
        uint256 ownerAmount = (revenueGenerated * projectOwnerRevenuePercent) / 100;
        uint256 investorsAmount = revenueGenerated - ownerAmount;
        
        // Transfer owner's share
        require(fundingToken.transfer(projectOwnerAddress, ownerAmount), "Owner transfer failed");
        
        // Distribute to investors
        for (uint256 i = 0; i < investors.length; i++) {
            address investor = investors[i];
            uint256 investorShare = (investorsAmount * investments[investor]) / totalInvestments;
            
            if (investorShare > 0) {
                require(fundingToken.transfer(investor, investorShare), "Investor transfer failed");
            }
        }
        
        emit RevenueDistributed(investorsAmount, ownerAmount);
        
        // Reset revenue counter
        revenueGenerated = 0;
    }

    /**
     * @dev Gets milestone details
     * @param milestoneId ID of the milestone
     * @return title, description, deliverables, fundingPercentage, fundingAmount, completed, votesFor, votesAgainst
     */
    function getMilestoneDetails(uint256 milestoneId) public view returns (
        string memory title,
        string memory description,
        string memory deliverables,
        uint256 fundingPercentage,
        uint256 fundingAmount,
        bool completed,
        uint256 votesFor,
        uint256 votesAgainst
    ) {
        require(milestoneId < milestoneCount, "Invalid milestone ID");
        
        Milestone storage milestone = milestones[milestoneId];
        
        return (
            milestone.title,
            milestone.description,
            milestone.deliverables,
            milestone.fundingPercentage,
            milestone.fundingAmount,
            milestone.completed,
            milestone.votesFor,
            milestone.votesAgainst
        );
    }

    /**
     * @dev Gets the number of investors
     * @return Number of investors
     */
    function getInvestorCount() public view returns (uint256) {
        return investors.length;
    }

    /**
     * @dev Gets project status as a string
     * @return Project status string
     */
    function getProjectStatus() public view returns (string memory) {
        if (status == ProjectStatus.Funding) return "Funding";
        if (status == ProjectStatus.Active) return "Active";
        if (status == ProjectStatus.Completed) return "Completed";
        if (status == ProjectStatus.Failed) return "Failed";
        return "Unknown";
    }
}
