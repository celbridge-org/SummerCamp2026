function makeBorderABoxCollider() {
    // invisible walls around the canvas
    let border = new Sprite([
        [0, 0],
        [canvas.w, 0],
        [canvas.w, canvas.h],
        [0, canvas.h],
        [0, 0] // repeat first vertex to close the chain
    ], 'static');
}