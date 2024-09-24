import ProjectsListItemTags from "../projects-list-item-tags/projects-list-item-tags";
import './projects-list-item.css';

function ProjectsListItem({ title, projectTags = [] }) {  // Устанавливаем значение по умолчанию для projectTags как пустой массив
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
                    {projectTags.map((tag, index) => (  // Проверяем, что теги существуют и перебираем их
                        <ProjectsListItemTags key={index} tagName={tag} />
                    ))}
                </div>
            </a>
        </div>
    );
}

export default ProjectsListItem;
