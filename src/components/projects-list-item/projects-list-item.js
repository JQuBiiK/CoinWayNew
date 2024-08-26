

import ProjectsListItemTags from "../projects-list-item-tags/projects-list-item-tags";
import './projects-list-item.css';

function ProjectsListItem() {
    return(
        <div className="col-6 projects-list-wrapper">
            <a href="" className="projects-list-item">
                <div className="projects-list-item-header">
                    <div className="projects-list-item-img">
                        <img src="" alt=""/>
                    </div>
                    <div className="projects-list-item-title"></div>
                </div>
                <div className="tags">
                    <ProjectsListItemTags />
                    <ProjectsListItemTags />
                </div>
                {/*<div className="filter-tags hide">*/}
                {/*    <div className="tags-item"></div>*/}
                {/*</div>*/}
            </a>
        </div>
    );
}

export default ProjectsListItem;