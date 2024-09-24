import ProjectsListItem from "../projects-list-item/projects-list-item";
import './project-list.css';

function ProjectList({ projects, tags }) {  // Принимаем список проектов и теги через пропсы
    return (
        <div className="projects-list">
            <div className="container">
                <div className="row">
                    {projects.map((project) => {
                        const projectTags = tags[project.id] || [];  // Получаем теги для проекта или пустой массив
                        return (
                            <ProjectsListItem
                                key={project.id}
                                title={project.title}
                                projectTags={projectTags}  // Передаем теги в ProjectsListItem
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProjectList;
