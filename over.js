const overBox = document.querySelector('.overBox');
const overBoxCanvas = document.createElement('canvas');
overBoxCanvas.width = window.innerWidth;
overBoxCanvas.height = window.innerHeight;
overBox.appendChild(overBoxCanvas);
const overBoxContext = overBoxCanvas.getContext('2d');

const textElements = [];
const maxTexts = 30;
const mousePosition = { x: 0, y: 0 };
const textArray = ["언어", "공동체", "로", "존재", "하는"]; // 사용할 텍스트 배열

function createText() {
    return {
        x: Math.random() * overBoxCanvas.width,
        y: Math.random() * overBoxCanvas.height,
        text: textArray[Math.floor(Math.random() * textArray.length)],
        opacity: 0.5,
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: (Math.random() - 0.5) * 2
    };
}

function drawTexts() {
    overBoxContext.clearRect(0, 0, overBoxCanvas.width, overBoxCanvas.height);

    textElements.forEach(text => {
        const distance = Math.hypot(text.x - mousePosition.x, text.y - mousePosition.y);
        if (distance < 50) { // 커서와의 거리가 50px 이내면 튕겨나가게
            text.velocityX = (text.x - mousePosition.x) * 0.1;
            text.velocityY = (text.y - mousePosition.y) * 0.1;
        }

        text.x += text.velocityX;
        text.y += text.velocityY;

        overBoxContext.font = '50px serif'; // 세리프 글꼴 설정
        overBoxContext.strokeStyle = `rgba(255, 255, 255, ${text.opacity})`; // 외곽선 색상 설정
        overBoxContext.lineWidth = 10; // 외곽선 두께 설정
        overBoxContext.strokeText(text.text, text.x, text.y); // 외곽선 텍스트 그리기

        text.opacity -= 0.0000005; // 텍스트가 서서히 사라지게
        if (text.opacity <= 0) {
            // Object.assign(text, createText()); // 텍스트를 재생성
        }
    });

    requestAnimationFrame(drawTexts);
}

window.addEventListener('mousemove', (event) => {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
});

window.addEventListener('resize', () => {
    overBoxCanvas.width = window.innerWidth;
    overBoxCanvas.height = window.innerHeight;
    textElements.forEach(text => {
        text.x = Math.random() * overBoxCanvas.width;
        text.y = Math.random() * overBoxCanvas.height;
    });
});

for (let i = 0; i < maxTexts; i++) {
    textElements.push(createText());
}

drawTexts();