import './projects-list-item-tags.css';

function ProjectsListItemTags({ tagName }) {  // Принимаем название тега через пропс tagName
    const tagClassName = `tags-item ${tagName}`;
    return (
        <div className={tagClassName}>
            {tagName}  {/* Отображаем название тега */}
        </div>
    );
}

export default ProjectsListItemTags;
