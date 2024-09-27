import ProjectsListItemTags from "../projects-list-item-tags/projects-list-item-tags";
import './projects-list-item.css';

function ProjectsListItem({ title, projectTags = [] }) {  // Принимаем теги как пропс
    return (
        <div className="col-6 projects-list-wrapper">
            <a href={'./index.html'} className="projects-list-item">
                <div className="projects-list-item-header">
                    <div className="projects-list-item-img">
                        <img src={123} alt={title} />  {/* Статическое изображение */}
                    </div>
                    <div className="projects-list-item-title">
                        {title}  {/* Отображаем title */}
                    </div>
                </div>
                <div className="tags">
                    {projectTags.map((tag, index) => (  // Отображаем теги проекта
                        <ProjectsListItemTags key={index} tagName={tag} />
                    ))}
                </div>
            </a>
        </div>
    );
}

export default ProjectsListItem;
