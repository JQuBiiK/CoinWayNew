import './app-slider.css';
import AppSliderItem from "../app-slider-item/app-slider-item";
import React, { useState, useRef } from 'react';

function AppSlider({ tags, onTagSelect }) {
    const [activeTag, setActiveTag] = useState('All');  // По умолчанию активен "All"
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Обработчик выбора тега
    const handleTagSelect = (tag) => {
        setActiveTag(tag);  // Устанавливаем активный тег
        onTagSelect(tag);  // Вызываем callback для фильтрации проектов
    };

    // Начало свайпа
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    // Продолжение свайпа
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;  // Увеличиваем скорость прокрутки
        sliderRef.current.scrollLeft = scrollLeft - walk;
        handleBoundaryCheck();
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 1.2;  // Увеличиваем скорость прокрутки
        sliderRef.current.scrollLeft = scrollLeft - walk;
        handleBoundaryCheck();
    };

    // Завершение свайпа
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // Ограничение движения слайдера до первого и последнего элемента
    const handleBoundaryCheck = () => {
        const slider = sliderRef.current;
        if (slider.scrollLeft <= 0) {
            slider.scrollLeft = 0;  // Ограничение влево
        } else if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
            slider.scrollLeft = slider.scrollWidth - slider.clientWidth;  // Ограничение вправо
        }
    };

    return (
        <div className="slider">
            <div
                className="slider-tabs"
                ref={sliderRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="slider-tabs-block-visible">
                    {/* Тег "All" */}
                    <div
                        className={`slider-tabs-item ${activeTag === 'All' ? 'active' : ''}`}
                        data-tab="all"
                        onClick={() => handleTagSelect('All')}
                    >
                        All
                    </div>

                    {/* Отображаем остальные теги */}
                    {tags.map(tag => (
                        <AppSliderItem
                            key={tag.id}
                            tagName={tag.name}
                            isActive={activeTag === tag.name}  // Передаем активное состояние
                            onClick={() => handleTagSelect(tag.name)}  // Обработчик клика
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AppSlider;
