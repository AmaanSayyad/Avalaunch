// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ProjectInfo.sol";

/**
 * @title ProjectFactory
 * @dev Contract for creating new milestone-based funding projects
 */
contract ProjectFactory {
    // Array to store addresses of all deployed projects
    address[] public deployedProjects;
    
    // Event emitted when a new project is created
    event ProjectCreated(
        address indexed projectAddress,
        address indexed creator,
        uint256 fundingRequired,
        string projectDataIPFS
    );

    /**
     * @dev Creates a new project with milestone-based funding
     * @param projectDataIPFS IPFS hash containing all project details
     * @param projectOwnerAddress Address of the project owner
     * @param fundingRequired Total funding amount required for the project
     * @param fundingRaiseDeadline Timestamp when funding period ends
     * @param projectOwnerRevenuePercent Percentage of revenue that goes to project owner
     */
    function createProject(
        string memory projectDataIPFS,
        address projectOwnerAddress,
        uint256 fundingRequired,
        uint256 fundingRaiseDeadline,
        uint256 projectOwnerRevenuePercent
    ) public {
        // Validate inputs
        require(fundingRequired > 0, "Funding amount must be greater than 0");
        require(fundingRaiseDeadline > block.timestamp, "Deadline must be in the future");
        require(projectOwnerRevenuePercent <= 100, "Revenue percentage must be <= 100");
        
        // Create new project
        ProjectInfo newProject = new ProjectInfo(
            projectDataIPFS,
            projectOwnerAddress,
            fundingRequired,
            fundingRaiseDeadline,
            projectOwnerRevenuePercent
        );
        
        // Store the project address
        deployedProjects.push(address(newProject));
        
        // Emit event
        emit ProjectCreated(
            address(newProject),
            projectOwnerAddress,
            fundingRequired,
            projectDataIPFS
        );
    }
    
    /**
     * @dev Returns all deployed projects
     * @return Array of project addresses
     */
    function getDeployedProjects() public view returns (address[] memory) {
        return deployedProjects;
    }
}
