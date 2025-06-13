
// Using Scrollama and Mapbox GL to create an interactive scrollytelling map exploring domestic migration data from the Census Bureau
// Built on top of https://github.com/mapbox/storytelling
var config = {
    // apply base styles with layers from mapbox studio
    style: 'mapbox://styles/tejalw/cmbr8zvrl00vq01s27hmr4uuh',
    accessToken: 'pk.eyJ1IjoidGVqYWx3IiwiYSI6ImNtYnI2ZW54aDA2dXAyaXB2dm50NXFnY3IifQ.1YpdEWLRTTHVLE5W8A6TnA',
    projection: 'albers',
    inset: false,
    theme: 'dark',
    chapters: [
        {
            // Chapter 1: Overall trends by region
            id: 'slug-style-id',
            alignment: 'left',
            hidden: false,
            description: 'Overall, Americans migrated towards the Sun Belt, continuing a trend from previous years. Texas led the way in numbers, making up nearly 21% of all the 411,004 state-to-state migrants between July 1, 2023 and July 1, 2024.',
            location: {
                center: [-97.63692, 39.53021],
                zoom: 3.9,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            callback: '',
            onChapterEnter: [
                {
                    // adding the layer with regional datapoints when the reader scrolls in
                    layer: 'regions',
                    opacity: 0.5
                }
            ],
            onChapterExit: [
                {
                    // removing regional layer when the reader scrolls past
                    layer: 'regions',
                    opacity: 0
                }
            ]
        },
        {
            // Chapter 2: Trends by state
            id: 'second-identifier',
            alignment: 'left',
            hidden: false,
            description: 'This is not surprising. Texas, like most other southern states, has seen a positive net state-to-state migration since 2020.',
            location: {
                center: [-97.63692, 39.53021],
                zoom: 3.9,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            callback: '',
            onChapterEnter: [ 
                {
                    // adding the layer with state-level datapoints when the reader scrolls in
                    layer: 'state-percent',
                    opacity: 0.5
                }
            ],
            onChapterExit: [ 
                {
                    // removing regional layer when the reader scrolls past
                    layer: 'state-percent',
                    opacity: 0
                }
            ]
        },
        {
            // Chapter 3: Focusing on Virginia
            id: 'third-identifier',
            alignment: 'left',
            hidden: false,
            description: 'In fact, the only state in the Sun Belt that has flipped from a net negative rate of domestic migration to positive is Virginia. With a record population of 8.8 million, it saw the highest number of domestic migrants in the past four years. <br><br> This rise in population was accompanied by the <a href="https://www.elections.virginia.gov/resultsreports/registrationturnout-statistics/" target="_blank">highest-ever number of registered voters in the state</a> for a presidential election since 1976 (Kamala Harris won Virginia in November 2024 by a 5.78% margin). As demand increased, statewide median home prices also rose by 7% year-over-year, reaching $461,800 in July 2024 <a href="https://www.redfin.com/state/Virginia/housing-market#supply" target="_blank">according to housing data from Redfin</a>.',
            location: {
                center: [-80.86057, 37.51803],
                zoom: 6.5,
                pitch: 8.01,
                bearing: 0,
                speed: 1.5
            },
            mapAnimation: 'flyTo',
            callback: '',
            onChapterEnter: [
                {
                    // adding the layer with county-level datapoints when the reader scrolls in
                    layer: 'va-counties-migration',
                    opacity: 1
                }
            ],
            onChapterExit: [
                {
                    // removing county layer when the reader scrolls past
                    layer: 'va-counties-migration',
                    opacity: 0
                }
            ]
        },
        {
            // Chapter 3: Focusing on Virginia ctd. with additional context
            id: 'fourth-chapter',
            alignment: 'left',
            hidden: false,
            description: 'Chesterfield County and Suffolk City saw the highest number of domestic migrants in the past year, raising their population by 2,096 and 1,608 residents respectively. Fairfax County lost the most residents in the state, losing 8,323 residents to other counties in and outside the state.',
            location: {
                center: [-80.86057, 37.51803],
                zoom: 6.5,
                pitch: 8.01,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            callback: '',
            onChapterEnter: [
                {
                    // adding the layer with county-level datapoints when the reader scrolls in
                    layer: 'va-counties-migration',
                    opacity: 1
                }
            ],
            onChapterExit: []
        }
    ]
};


// More config for Mapbox GL
var initLoad = true;
var layerTypes = {
    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity'],
    'heatmap': ['heatmap-opacity']
}

var alignments = {
    'left': 'lefty',
    'center': 'centered',
    'right': 'righty',
    'full': 'fully'
}

// Helper function to get layer
function getLayerPaintType(layer) {
    var layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
}

// Helper function to set opacity for layers, triggered on scroll
function setLayerOpacity(layer) {
    var paintProps = getLayerPaintType(layer.layer);
    paintProps.forEach(function (prop) {
        var options = {};
        if (layer.duration) {
            var transitionProp = prop + "-transition";
            options = { "duration": layer.duration };
            map.setPaintProperty(layer.layer, transitionProp, options);
        }
        map.setPaintProperty(layer.layer, prop, layer.opacity, options);
    });
}

// Create a popup instance 
const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

// Helper function to add tooltips, used in Chapters 3 & 4
function addTooltip(layer, property_name, property_value) {
    // show tooltip on hover
    map.on('mouseenter', layer, (e) => {
        // only show tooltip if the layer is visible
        if (map.getPaintProperty(layer, 'icon-opacity') == 0) {
            return;
        }
        
        // Copy coordinates, name, description
        const coordinates = e.features[0].geometry.coordinates.slice();
        const name = e.features[0].properties[property_name];
        const value = e.features[0].properties[property_value];
        const description = name + '<br>' + value;
        
        // Ensure that if multiple copies of the feature are visible, the popup appears over the copy being pointed to
        if (['mercator', 'equirectangular'].includes(map.getProjection().name)) {
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] +=
                e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
        }
        
        // Populate the popup and set its coordinates based on the feature found
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });
    // hide tooltip when mouse leaves
    map.on('mouseleave', layer, () => {
        popup.remove();
    });
}

// Set up Scrollama
var story = document.getElementById('story');
var features = document.createElement('div');
features.setAttribute('id', 'features');

// Set up chapters
config.chapters.forEach((record, idx) => {
    var container = document.createElement('div');
    var chapter = document.createElement('div');
    
    if (record.title) {
        var title = document.createElement('h3');
        title.innerText = record.title;
        chapter.appendChild(title);
    }
    
    if (record.description) {
        var story = document.createElement('p');
        story.innerHTML = record.description;
        chapter.appendChild(story);
    }
    
    container.setAttribute('id', record.id);
    container.classList.add('step');
    if (idx === 0) {
        container.classList.add('active');
    }
    
    chapter.classList.add(config.theme);
    container.appendChild(chapter);
    container.classList.add(alignments[record.alignment] || 'centered');
    if (record.hidden) {
        container.classList.add('hidden');
    }
    features.appendChild(container);
});

story.appendChild(features);

// Set up Mapbox
mapboxgl.accessToken = config.accessToken;
var map = new mapboxgl.Map({
    container: 'map',
    style: config.style,
    center: config.chapters[0].location.center,
    zoom: config.chapters[0].location.zoom,
    bearing: config.chapters[0].location.bearing,
    pitch: config.chapters[0].location.pitch,
    interactive: false,
    projection: config.projection
});


// Instantiate Scrollama
var scroller = scrollama();
map.on("load", function () {
    // Set up the instance, pass callback functions
    scroller
    .setup({
        step: '.step',
        offset: 0.5,
        progress: true
    })
    .onStepEnter(async response => {
        // Execute the changes outlined in config on entering each step
        var current_chapter = config.chapters.findIndex(chap => chap.id === response.element.id);
        var chapter = config.chapters[current_chapter];
        
        response.element.classList.add('active');
        map[chapter.mapAnimation || 'flyTo'](chapter.location);
        
        if (config.showMarkers) {
            marker.setLngLat(chapter.location.center);
        }
        if (chapter.onChapterEnter.length > 0) {
            chapter.onChapterEnter.forEach(setLayerOpacity);
        }
        if (chapter.callback) {
            window[chapter.callback]();
        }
        if (chapter.rotateAnimation) {
            map.once('moveend', () => {
                const rotateNumber = map.getBearing();
                map.rotateTo(rotateNumber + 180, {
                    duration: 30000, easing: function (t) {
                        return t;
                    }
                });
            });
        }
        if (config.auto) {
            var next_chapter = (current_chapter + 1) % config.chapters.length;
            map.once('moveend', () => {
                document.querySelectorAll('[data-scrollama-index="' + next_chapter.toString() + '"]')[0].scrollIntoView();
            });
        }
    })
    .onStepExit(response => {
        // Execute the changes outlined in config on exiting each step
        var chapter = config.chapters.find(chap => chap.id === response.element.id);
        response.element.classList.remove('active');
        if (chapter.onChapterExit.length > 0) {
            chapter.onChapterExit.forEach(setLayerOpacity);
        }
    });
    
    if (config.auto) {
        document.querySelectorAll('[data-scrollama-index="0"]')[0].scrollIntoView();
    }
    // Add tooltip to Chapter 3 & 4
    addTooltip('va-counties-migration', 'NAMELSAD', 'Net Domestic Migration');
    // hide Chapter 3 & 4 icons before the layer is visible
    map.setPaintProperty('va-counties-migration', 'icon-opacity', 0);
});    

// hide map until the reader scrolls into the first chapter and after they scroll past the last chapter
window.addEventListener('scroll', () => {
    const scrolly = document.getElementById('story');
    const rect = scrolly.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    document.body.classList.toggle('scrolly-visible', inView);
});
