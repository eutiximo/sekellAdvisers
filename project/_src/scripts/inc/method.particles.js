function fnParticles(idElem, nameSet) {
    var sets = {},
        config;
    
    sets.set1_opacity = 0.5;
    sets.set2_opacity = 0.3;
    sets.set1 = {
        particles: {
            number: {
                value: 15
            },
            move: {
                random: true,
                speed: 5,
                out_mode: 'bounce'
            },
            color: {
                value: "#FFFFFF"
            },
            size: {
                value: 7,
                random: false,
                anim: {
                    size_min: 5,
                    speed: 200
                }
            },
            line_linked: {
                distance: 250,
                color: "#FFFFFF",
                opacity: sets.set1_opacity
            },
            opacity: {
                value: sets.set1_opacity,
                random: true
            }
        }
    };
    sets.set2 = {
        particles: {
            number: {
                value: 5
            },
            move: {
                random: true,
                speed: 15,
                out_mode: 'out'
            },
            color: {
                value: "#000000"
            },
            size: {
                value: 7,
                random: false,
                anim: {
                    size_min: 5,
                    speed: 200
                }
            },
            line_linked: {
                distance: 400,
                color: "#000000",
                opacity: sets.set2_opacity
            },
            opacity: {
                value: sets.set2_opacity,
                random: true
            }
        }
    };
    
    particlesJS(idElem, sets[nameSet]);
}