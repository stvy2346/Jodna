import React from 'react';
import './Projects.css';

const Projects = ({ user, sandboxProxy }) => {
  const mockProjects = [
    { id: 1, name: 'Website Redesign', description: 'Complete overhaul of company website', tickets: 23 },
    { id: 2, name: 'Mobile App UI', description: 'Design new mobile application interface', tickets: 15 },
    { id: 3, name: 'Brand Guidelines', description: 'Create comprehensive brand guide', tickets: 8 }
  ];

  const canCreateProject = user.role === 'ADMIN' || user.role === 'MANAGER';

  const handleCreateProject = () => {
    // TODO: Open modal or navigate to create project page
    console.log('Create new project');
  };

  const handleProjectClick = (project) => {
    // TODO: Navigate to project details or open in Express
    console.log('Opening project:', project);
    // Example: Use sandboxProxy if needed
    // sandboxProxy.openProject(project.id);
  };

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>Projects</h1>
        {canCreateProject && (
          <button className="btn-primary" onClick={handleCreateProject}>
            + New Project
          </button>
        )}
      </div>
      <div className="projects-grid">
        {mockProjects.map(project => (
          <div 
            key={project.id} 
            className="project-card"
            onClick={() => handleProjectClick(project)}
          >
            <div className="project-name">{project.name}</div>
            <div className="project-description">{project.description}</div>
            <div className="project-meta">
              <span>{project.tickets} tickets</span>
              <span>Updated 2 days ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;