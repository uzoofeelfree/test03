// 삼각형을 그리는 함수
function drawTriangle(context) {
    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;
    
    const centerX = canvasWidth / 2 - 20; // 20 픽셀 왼쪽으로 이동
    const centerY = canvasHeight / 2;
    
    const triangleHeight = canvasHeight * 0.8; // 캔버스 높이의 80%로 설정
    const triangleBase = canvasWidth * 0.8; // 캔버스 너비의 80%로 설정
    
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.beginPath();
    context.moveTo(centerX, centerY - triangleHeight / 2); // 삼각형의 첫 번째 점 (위쪽)
    context.lineTo(centerX - triangleBase / 2, centerY + triangleHeight / 2); // 삼각형의 두 번째 점 (왼쪽 아래)
    context.lineTo(centerX + triangleBase / 2, centerY + triangleHeight / 2); // 삼각형의 세 번째 점 (오른쪽 아래)
    
    context.closePath();
    context.strokeStyle = 'white';
    context.stroke();
}
    
// 삼각형 선을 따라 글자를 생성하고 사라지게 하는 함수
function animateShapes(context) {
    const shapes = [];
    const maxShapes = 15;
    const speed = 0.0005; // 속도를 조정하여 글자의 이동 속도를 설정
    const texts = ["재호명", "재정의", "재명명"]; // 사용할 텍스트 배열
    
    function addShape() {
        if (shapes.length < maxShapes) {
            const shape = {
                t: Math.random(), // 삼각형 경로를 따라 이동할 위치를 타내는 매개변수
                text: texts[Math.floor(Math.random() * texts.length)], // 랜덤 텍스트 선택
                size: Math.random() * 5 + 2
            };
            shapes.push(shape);
        }
    }
    
    function updateShapes() {
        shapes.forEach(shape => {
            shape.t += speed;
            if (shape.t > 1) shape.t = 0;
    
            const canvasWidth = context.canvas.width;
            const canvasHeight = context.canvas.height;
    
            const centerX = canvasWidth / 2 - 20; // 20 픽셀 왼쪽으로 이동
            const centerY = canvasHeight / 2;
    
            const triangleHeight = canvasHeight * 0.8; // 캔버스 높이의 80%로 설정
            const triangleBase = canvasWidth * 0.7; // 캔버스 너비의 80%로 설정
    
            const p1 = { x: centerX, y: centerY - triangleHeight / 2 };
            const p2 = { x: centerX - triangleBase / 2, y: centerY + triangleHeight / 2 };
            const p3 = { x: centerX + triangleBase / 2, y: centerY + triangleHeight / 2 };
    
            if (shape.t < 1 / 3) {
                const t = shape.t * 3;
                shape.x = (1 - t) * p1.x + t * p2.x;
                shape.y = (1 - t) * p1.y + t * p2.y;
            } else if (shape.t < 2 / 3) {
                const t = (shape.t - 1 / 3) * 3;
                shape.x = (1 - t) * p2.x + t * p3.x;
                shape.y = (1 - t) * p2.y + t * p3.y;
            } else {
                const t = (shape.t - 2 / 3) * 3;
                shape.x = (1 - t) * p3.x + t * p1.x;
                shape.y = (1 - t) * p3.y + t * p1.y;
            }
        });
    }
    
    function drawShapes() {
        context.font = 'bold 48px Arial'; // 글꼴 크기 증가
        context.strokeStyle = 'rgba(255, 255, 255, 0.8)'; // 외곽선 색상 정
        shapes.forEach(shape => {
            context.strokeText(shape.text, shape.x, shape.y); // 외곽선 텍스트 그리기
        });
    }
    
    function animate() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        drawTriangle(context);
        addShape();
        updateShapes();
        drawShapes();
        requestAnimationFrame(animate);
    }
    
    animate();
}
    
// 캔버스 초기화 및 애니메이션 시작
const triangleCanvas = document.getElementById('triangleCanvas');
const triangleContext = triangleCanvas.getContext('2d');
drawTriangle(triangleContext);
animateShapes(triangleContext);