import ProjectsListItem from "../projects-list-item/projects-list-item";
import './project-list.css';

function ProjectList({ projects, tags }) {  // Принимаем теги
    return (
        <div className="projects-list">
            <div className="container">
                <div className="row">
                    {projects.map((project) => {
                        const projectTags = tags[project.id] || [];  // Получаем теги для каждого проекта
                        return (
                            <ProjectsListItem
                                key={project.id}
                                title={project.title}
                                projectTags={projectTags}  // Передаем теги в ProjectListItem
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProjectList;
