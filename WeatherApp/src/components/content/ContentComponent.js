import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite/no-important';
import WeatherData from './WeatherData';


const styles = StyleSheet.create({
    lastRow: {
        marginTop: 30
    },
    weatherData: {
        marginRight: 30,
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },

});

function ContentComponent() {
    return (
        <Column>

            <Row horizontal="space-between" className={css(styles.lastRow)} breakpoints={{ 1024: 'column' }}>
                <WeatherData containerStyles={styles.weatherData} />

            </Row>
        </Column>
    );
}

export default ContentComponent;
