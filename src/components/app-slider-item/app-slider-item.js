import './app-slider-item.css';

function AppSliderItem({ tagName, isActive, onClick }) {  // Принимаем название тега, его активное состояние и обработчик клика
    return (
        <div
            className={`slider-tabs-item ${isActive ? 'active' : ''}`}
            data-tab={tagName}
            onClick={onClick}  // Добавляем обработчик клика
        >
            {tagName}  {/* Отображаем название тега */}
        </div>
    );
}

export default AppSliderItem;
