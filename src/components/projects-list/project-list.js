
import ProjectsListItem from "../projects-list-item/projects-list-item";
import './project-list.css';

function ProjectList() {
    return(
        <div className="projects-list">
            <div className="container">
                <div className="row">
                    <ProjectsListItem />
                    <ProjectsListItem />
                    <ProjectsListItem />
                    <ProjectsListItem />
                    <ProjectsListItem />
                    <ProjectsListItem />
                </div>
            </div>
        </div>
    );
}

export default ProjectList;