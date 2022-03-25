export const WeatherInfo = props => {
    return (
        <div id="weather-info">
            <div>
                <span id="temperature">
                  {`${props.temperature}°`}
                </span>
            </div>
            <div>
                <span id="city">
                    {props.city}
                </span>
            </div>
            <div>
                {props.condition}
            </div>
        </div>
    );
}
