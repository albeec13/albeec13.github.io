const BACKGROUND = "#101010";
const FOREGROUND = "#50FF50";
const WIDTH = 600;
const HEIGHT = 650;

console.log(game);
game.width = WIDTH;
game.height = HEIGHT;

const ctx = game.getContext("2d", {willReadFrequently: true});
console.log(ctx);

function clear() {
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, game.width, game.height);
}

function point({x, y, z}) {
    const s = 20 / z;
    ctx.fillStyle = FOREGROUND;
    ctx.fillRect(x - s/2, y - s/2, s, s);
}

function screen({x, y, z}) {
    return {
        x: (x + 1)/2 * WIDTH,
        y: (1 - (y + 1)/2) * HEIGHT,
        z
    };
}

function project({x, y, z}) {
    return {
        x: x/z,
        y: y/z,
        z
    };
}

//Rotating cube
const points_cube = [
    {x:  0.5, y:  0.5, z: 0.5},
    {x: -0.5, y:  0.5, z: 0.5},
    {x: -0.5, y: -0.5, z: 0.5},
    {x:  0.5, y: -0.5, z: 0.5},

    {x:  0.5, y:  0.5, z: -0.5},
    {x: -0.5, y:  0.5, z: -0.5},
    {x: -0.5, y: -0.5, z: -0.5},
    {x:  0.5, y: -0.5, z: -0.5}
];

const faces_cube = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7]
];

// Hockey Stick
const points_hockey = [
    {x:  0.025, y:  0.95, z: 0.025},
    {x: -0.025, y:  0.95, z: 0.025},
    {x: -0.025, y: -0.55, z: 0.025},
    {x: -0.025, y: -0.60, z: 0.025},
    {x: -0.045, y: -0.64, z: 0.015},
    {x: -0.075, y: -0.67, z: 0.010},
    {x: -0.35,  y: -0.75, z: 0.005},
    {x: -0.40,  y: -0.80, z: 0.005},
    {x: -0.39,  y: -0.85, z: 0.005},
    {x: -0.33,  y: -0.86, z: 0.005},
    {x: -0.25,  y: -0.85, z: 0.015},
    {x:  0,     y: -0.73, z: 0.015},
    {x:  0.025, y: -0.67, z: 0.025},

    {x:  0.025, y:  0.95, z: -0.025},
    {x: -0.025, y:  0.95, z: -0.025},
    {x: -0.025, y: -0.55, z: -0.025},
    {x: -0.025, y: -0.60, z: -0.025},
    {x: -0.045, y: -0.64, z: -0.015},
    {x: -0.075, y: -0.67, z: -0.010},
    {x: -0.35,  y: -0.75, z: -0.005},
    {x: -0.40,  y: -0.80, z: -0.005},
    {x: -0.39,  y: -0.85, z: -0.005},
    {x: -0.33,  y: -0.86, z: -0.005},
    {x: -0.25,  y: -0.85, z: -0.015},
    {x:  0,     y: -0.73, z: -0.015},
    {x:  0.025, y: -0.67, z: -0.025}
];

const faces_hockey = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    [0, 13],
    [1, 14],
    [2, 15],
    [3, 16],
    [4, 17],
    [5, 18],
    [6, 19],
    [7, 20],
    [8, 21],
    [9, 22],
    [10, 23],
    [11, 24],
    [12, 25]
];

// Spherical Polyhedron
const points_poly = [
    {x: 1, y: 0, z: 0},             // 0
    {x: 0.707, y: 0.707, z: 0},     // 1
    {x: 0, y: 1, z: 0},             // 2
    {x: -0.707, y: 0.707, z: 0},    // 3
    {x: -1, y: 0, z: 0},            // 4
    {x: -0.707, y: -0.707, z: 0},   // 5
    {x: 0, y: -1, z: 0},            // 6
    {x: 0.707, y: -0.707, z: 0},    // 7
    {x: 0, y: 0, z: 1},             // 8
    {x: 0, y: 0.707, z: 0.707},     // 9
    {x: 0,  y: 0.707, z: -0.707},   // 10
    {x: 0, y: 0, z: -1},            // 11
    {x: 0,  y: -0.707, z: -0.707},  // 12
    {x: 0, y: -0.707, z: 0.707},    // 13
    {x: 0.707, y: 0, z: 0.707},     // 14
    {x: -0.707, y: 0, z: 0.707},    // 15
    {x: -0.707,  y: 0, z: -0.707},  // 16
    {x: 0.707,  y: 0, z: -0.707}    // 17
];

const faces_poly = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 2, 10, 11, 12, 6, 13],
    [0, 14, 8, 15, 4, 16, 11, 17],
    [1, 9, 3, 10],
    [7, 13, 5, 12],
    [1, 14, 7, 17],
    [3, 15, 5, 16],
    [14, 9, 15, 13],
    [17, 10, 16, 12]
];

function translate_z({x, y, z}, dz) {
    return {x, y, z: z + dz};
}

function rotate_y({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);

    return {
        x: x*c + z*s,
        y,
        z: -x*s + z*c
    };
}

function rotate_x({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);

    return {
        x,
        y: y*c - z*s,
        z: y*s + z*c
    };
}

function rotate_z({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);

    return {
        x: x*c - y*s,
        y: x*s + y*c,
        z
    };
}

function line(p1, p2) {
    let zMin = Math.min(p1.z, p2.z);
    ctx.strokeStyle = FOREGROUND;
    ctx.lineWidth = 3 / (zMin);

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function drawLongitudes() {
    const STEPS = 80;
    const COUNT = 32;
    const TWO_PI = Math.PI * 2;

    for (let k = 0; k < COUNT; k++) {
        const phi = (k / COUNT) * TWO_PI;

        let prev = null;

        for (let i = 0; i <= STEPS; i++) {
            const t = (i / STEPS) * TWO_PI;

            // Base great circle in XY plane
            let x = Math.cos(t);
            let y = Math.sin(t);
            let z = 0;

            // Rotate around y-axis
            const {x: xr, y: yr, z: zr} = rotate_y({x, y, z}, phi);

            // Apply your transforms
            const P = translate_z(
                rotate_x(
                    rotate_y(
                        rotate_z({x: xr, y: yr, z: zr}, angle_z),
                    angle_y),
                angle_x),
            dz);

            const q = screen(project(P));

            if (prev) {
                const zNear = Math.min(prev.z, q.z);
                ctx.lineWidth = 3 / zNear;
                ctx.strokeStyle = FOREGROUND;

                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(q.x, q.y);
                ctx.stroke();
            }

            prev = q;
        }
    }
}


function drawLatitudes() {
    const STEPS = 80;
    const COUNT = 32;
    const TWO_PI = Math.PI * 2;

    for (let k = 1; k <= COUNT; k++) {
        const theta = (k / (COUNT + 1)) * Math.PI - Math.PI/2;

        const y0 = Math.sin(theta);
        const r = Math.cos(theta);

        let prev = null;

        for (let i = 0; i <= STEPS; i++) {
            const phi = (i / STEPS) * TWO_PI;

            const x = r * Math.cos(phi);
            const y = y0;
            const z = r * Math.sin(phi);

            const P = translate_z(
                rotate_x(
                    rotate_y(
                        rotate_z({x, y, z}, angle_z),
                    angle_y),
                angle_x),
            dz);

            const q = screen(project(P));

            if (prev) {
                const zNear = Math.min(prev.z, q.z);
                ctx.lineWidth = 3 / zNear;
                ctx.strokeStyle = FOREGROUND;

                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(q.x, q.y);
                ctx.stroke();
            }

            prev = q;
        }
    }
}


const FPS = 60
let dz = 1.5
let angle_y = 0
let angle_x = 0
let angle_z = 0 //23.44 * Math.PI / 180 //earth's axial tilt
let keys = {}
let step = 2*Math.PI*0.01;

let faces = [faces_cube, faces_hockey, faces_poly];
let points = [points_cube, points_hockey, points_poly];
let state = 0;
let draw_points = false;
let auto_rotate = true;

window.addEventListener("keydown", (event) => {
    if (event.key === "Control" ||
        event.key === "Shift" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === " ")
    {
        keys[event.key] = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.key === "Control" ||
        event.key === "Shift" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === " ")
    {
        keys[event.key] = false;

        if(event.key === "Shift" || event.key === "Control")
            console.log(dz);
    }

    if (event.key === "Enter") {
        state = ++state % 4;
    }

    if (event.key === "p") {
        draw_points = !draw_points;
    }

    if (event.key === "a") {
        auto_rotate = !auto_rotate;
    }
});

function frame() {
    const dt = 1/FPS
    //dz += 0.1*dt

    if(auto_rotate) {
        angle_y += step * 0.4;
        angle_x += step * 0.2;
        angle_z += step * 0.1;
    }

    clear();
    ctx.font = "16px Arial";
    ctx.fillStyle = FOREGROUND;
    ctx.fillText("Controls: Arrrow Keys, p (show/hide points), a (auto-rotate toggle),", 20, 610);
    ctx.fillText("               Shift/Control (zoom), Spacebar (reset), Enter (toggle shapes)", 20, 630);

    if (keys["Control"]) {dz += 0.1; dz = dz >= 100 ? 100: dz}
    if (keys["Shift"]) {dz -= 0.1; dz = dz <= 1.5 ? 1.5 : dz}
    if (keys["ArrowUp"]) {angle_x += step}
    if (keys["ArrowDown"]) {angle_x -= step}
    if (keys["ArrowLeft"]) {angle_y += step}
    if (keys["ArrowRight"]) {angle_y -= step}
    if (keys[" "]) {angle_x = angle_y = angle_z = 0}

    if(state === 3) {
        drawLongitudes();
        drawLatitudes();
    }
    else {
        if(draw_points) {
            for (const p of points[state]) {
                point(
                    screen(
                        project(
                            translate_z(
                                rotate_x(
                                    rotate_y(
                                        rotate_z(p, angle_z),
                                        angle_y
                                    ),
                                    angle_x
                                ),
                                dz
                            )
                        )
                    )
                );
            }
        }

        for (const f of faces[state]) {
            for (let i = 0; i < f.length; i++) {
                const a = points[state][f[i]];
                const b = points[state][f[(i+1)%f.length]];

                line(
                    screen(
                        project(
                            translate_z(
                                rotate_x(
                                    rotate_y(
                                        rotate_z(a, angle_z),
                                        angle_y
                                    ),
                                    angle_x
                                ),
                                dz
                            )
                        )
                    ),
                    screen(
                        project(
                            translate_z(
                                rotate_x(
                                    rotate_y(
                                        rotate_z(b, angle_z),
                                        angle_y
                                    ),
                                    angle_x
                                ),
                                dz
                            )
                        )
                    )
                );
            }
        }
    }

    setTimeout(frame, 1000/FPS);
}
setTimeout(frame, 1000/FPS);