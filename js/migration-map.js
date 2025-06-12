var config = {
    style: 'mapbox://styles/tejalw/cmbr8zvrl00vq01s27hmr4uuh',
    // leave commented to use Mapbox Standard Style
    accessToken: MAPBOX_TOKEN,
    showMarkers: false,
    markerColor: '#3FB1CE',
    projection: 'albers',
    //Read more about available projections here
    //https://docs.mapbox.com/mapbox-gl-js/example/projections/
    inset: false,
    // insetOptions: {
    //     markerColor: 'orange'
    // },
    // insetPosition: 'bottom-right',
    theme: 'dark',
    // use3dTerrain: false, //set true for enabling 3D maps.
    // auto: false,
    // title: 'Your Title Goes Here',
    // subtitle: 'The Storytelling Template helps you create an awesome animated map story with ease.',
    // byline: 'By a I.M. Amapper',
    // footer: 'Source: source citations, etc. <br> Created using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.',
    chapters: [
        {
            id: 'slug-style-id',
            alignment: 'left',
            hidden: false,
            // title: 'San Francisco',
            // image: './assets/san-fran.jpeg',
            description: 'Overall, Americans migrated towards the sun belt, continuing a trend from previous years. Texas led the way in numbers, making up nearly 21 percent of all the 411,004 domestic migrants between states from July 1, 2023 to July 1, 2024.',
            location: {
                center: [-97.63692, 39.53021],
                zoom: 4,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            // rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'regions',
                    opacity: 0.4
                }
            ],
            onChapterExit: [
                {
                    layer: 'regions',
                    opacity: 0
                }
            ]
        },
        {
            id: 'second-identifier',
            alignment: 'left',
            hidden: false,
            // title: 'Washington, D.C.',
            // image: './assets/washington-dc.jpg',
            description: 'This is not surprising. Texas, like most other southern states, has seen a positive net state-to-state migration since 2020.',
            location: {
                center: [-97.63692, 39.53021],
                zoom: 4,
                pitch: 0,
                bearing: 0
                // flyTo additional controls-
                // These options control the flight curve, making it move
                // slowly and zoom out almost completely before starting
                // to pan.
                //speed: 2, // make the flying slow
                //curve: 1, // change the speed at which it zooms out
            },
            mapAnimation: 'flyTo',
            // rotateAnimation: true,
            callback: '',
            onChapterEnter: [ {
                layer: 'state-percent',
                opacity: 0.4
            }],
            onChapterExit: [ {
                layer: 'state-percent',
                opacity: 0
            }]
        },
        {
            id: 'third-identifier',
            alignment: 'left',
            hidden: false,
            // title: 'Minneapolis',
            // image: './assets/geneva.jpg',
            description: 'In fact, the only state in the sun belt that has flipped from a net negative rate of domestic migration to net positive is Virginia. With a record population of 8.8 million, it saw the highest number of domestic migrants in the past four years. <br><br> This rise in population was accompanied by the <a href="https://www.elections.virginia.gov/resultsreports/registrationturnout-statistics/" target="_blank">highest ever number of registered voters in the state</a> for a presidential election since 1976 (Kamala Harris won Virginia in November 2024 by a 5.78% margin). As demand increased, statewide median home prices also rose by 7 percent year-over-year, reaching $461,800 in July 2024 <a href="https://www.redfin.com/state/Virginia/housing-market#supply" target="_blank">according to housing data from Redfin</a>.',
            location: {
                center: [-81.86057, 37.51803],
                zoom: 6.25,
                pitch: 8.01,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            // rotateAnimation: false,
            callback: '',
            onChapterEnter: [{
                layer: 'va-counties',
                opacity: 1
            }],
            onChapterExit: [{
                layer: 'va-counties',
                opacity: 0
            }]
        },
        {
            id: 'fourth-chapter',
            alignment: 'left',
            hidden: false,
            // title: 'Buenos Aires',
            // image: './assets/buenos-aires.jpg',
            description: 'Chesterfield County and Suffolk city saw the most increase in domestic migration in the past year, by +2,096 and +1,608 residents respectively. Fairfax County lost the most residents in the state, losing -8,323 residents to other counties in and outside the state.',
            location: {
                center: [-81.86057, 37.51803],
                zoom: 6.25,
                pitch: 8.01,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            // rotateAnimation: false,
            callback: '',
            onChapterEnter: [{
                layer: 'va-counties',
                opacity: 1
            }],
            onChapterExit: [{
                layer: 'va-counties',
                opacity: 0
            }]
        }
    ]
};














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

function getLayerPaintType(layer) {
    var layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
}

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

var story = document.getElementById('story');
var features = document.createElement('div');
features.setAttribute('id', 'features');

var header = document.createElement('div');

if (config.title) {
    var titleText = document.createElement('h1');
    titleText.innerText = config.title;
    header.appendChild(titleText);
}

if (config.subtitle) {
    var subtitleText = document.createElement('h2');
    subtitleText.innerText = config.subtitle;
    header.appendChild(subtitleText);
}

if (config.byline) {
    var bylineText = document.createElement('p');
    bylineText.innerText = config.byline;
    header.appendChild(bylineText);
}

if (header.innerText.length > 0) {
    header.classList.add(config.theme);
    header.setAttribute('id', 'header');
    story.appendChild(header);
}

config.chapters.forEach((record, idx) => {
    var container = document.createElement('div');
    var chapter = document.createElement('div');
    
    if (record.title) {
        var title = document.createElement('h3');
        title.innerText = record.title;
        chapter.appendChild(title);
    }
    
    if (record.image) {
        var image = new Image();
        image.src = record.image;
        chapter.appendChild(image);
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

var footer = document.createElement('div');

if (config.footer) {
    var footerText = document.createElement('p');
    footerText.innerHTML = config.footer;
    footer.appendChild(footerText);
}

if (footer.innerText.length > 0) {
    footer.classList.add(config.theme);
    footer.setAttribute('id', 'footer');
    story.appendChild(footer);
}

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

// Create a inset map if enabled in config.js
if (config.inset) {
    map.addControl(
        new GlobeMinimap({ ...config.insetOptions }),
        config.insetPosition
    );
}

if (config.showMarkers) {
    var marker = new mapboxgl.Marker({ color: config.markerColor });
    marker.setLngLat(config.chapters[0].location.center).addTo(map);
}


// instantiate the scrollama
var scroller = scrollama();


map.on("load", function () {
    // if (config.use3dTerrain) {
    //     map.addSource('mapbox-dem', {
    //         'type': 'raster-dem',
    //         'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
    //         'tileSize': 512,
    //         'maxzoom': 14
    //     });
    //     // add the DEM source as a terrain layer with exaggerated height
    //     map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
    
    //     // add a sky layer that will show when the map is highly pitched
    //     map.addLayer({
    //         'id': 'sky',
    //         'type': 'sky',
    //         'paint': {
    //             'sky-type': 'atmosphere',
    //             'sky-atmosphere-sun': [0.0, 0.0],
    //             'sky-atmosphere-sun-intensity': 15
    //         }
    //     });
    // };
    
    // setup the instance, pass callback functions
    scroller
    .setup({
        step: '.step',
        offset: 0.5,
        progress: true
    })
    .onStepEnter(async response => {
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
        var chapter = config.chapters.find(chap => chap.id === response.element.id);
        response.element.classList.remove('active');
        if (chapter.onChapterExit.length > 0) {
            chapter.onChapterExit.forEach(setLayerOpacity);
        }
    });
    
    
    if (config.auto) {
        document.querySelectorAll('[data-scrollama-index="0"]')[0].scrollIntoView();
    }
});    

window.addEventListener('scroll', () => {
    const scrolly = document.getElementById('story');
    const rect = scrolly.getBoundingClientRect();
    
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    document.body.classList.toggle('scrolly-visible', inView);
});
