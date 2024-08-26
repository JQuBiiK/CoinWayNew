
import './app-slider.css';
import AppSliderItem from "../app-slider-item/app-slider-item";

function AppSlider() {
    return(
        <div className="slider">
            <div className="slider-tabs">
                <div className="slider-tabs-block">
                    <div className="slider-tabs-block-visible">
                        <div className="slider-tabs-item active" data-tab="all">All</div>
                        <AppSliderItem/>
                        <AppSliderItem/>
                        <AppSliderItem/>
                        <AppSliderItem/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppSlider;