
function scrollHorizontally(event) {
  const container = document.querySelector('.scroll-container');
  container.scrollLeft += event.deltaY; // 가로 스크롤로 변경
  console.log('Scrolled X:', container.scrollLeft); // 스크롤된 x 값 출력
}

document.querySelector('.scroll-container').addEventListener('wheel', scrollHorizontally);


      // three.js 설정
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 70;
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth * 1.5, window.innerHeight * 1.5);
      
      // 캔버스 #t1 요소에 추가
      const t1Element = document.getElementById('t1');
      renderer.setSize(t1Element.clientWidth, t1Element.clientHeight);
      camera.aspect = t1Element.clientWidth / t1Element.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(window.devicePixelRatio);
      t1Element.appendChild(renderer.domElement);
      camera.position.z = 70;
      camera.aspect = t1Element.clientWidth / t1Element.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(t1Element.clientWidth, t1Element.clientHeight);

      // 창 크기 변경 시 렌더러와 카메라 업데이트
      window.addEventListener('resize', onWindowResize, false);

      function onWindowResize() {
          const t1Element = document.getElementById('t1');
          camera.aspect = t1Element.clientWidth / t1Element.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(t1Element.clientWidth, t1Element.clientHeight);
      }

      // 첫번째 박스입니다!!!!

      // 캔버스를 사용하여 텍스트 생
      function createTextTexture(text) {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = 300;
          canvas.height = 300;
          // context.fillStyle = 'rgba(20, 20, 20,1)';
          context.fillStyle = 'rgba(255, 255, 255,0)' ;
          context.fillStyle = 'white' ;


          context.fillRect(0, 0, canvas.width, canvas.height);
          // context.fillStyle = 'white';
          context.fillStyle = 'black';

          context.font = 'bold 100px serif';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(text, canvas.width / 2, canvas.height / 2);

          return new THREE.CanvasTexture(canvas);
      }

      // const texts = ["언어에", "수반되는", "차별또한", "정당하게", "여겨집니다"];
      const texts = ["언어", "공동체", "로", "존재", "하는"];

      // 구 생성 및 정육면체로 배치하는 함수
      const sphereGeometry = new THREE.SphereGeometry(12, 100,30); // 구체의 반지름과 세그먼트 설정

      function createSpheres(gridSize) {
          const spheres = [];
          let textIndex = 0; // 텍스트 인스 초기화
          const radius = 2.3; // 구의 반지름 설정
          const numSpheres = 15; // 구체의 개수 설정

          for (let i = 0; i < numSpheres; i++) {
              const theta = Math.acos(2 * Math.random() - 1); // 세타 각도
              const phi = 2 * Math.PI * Math.random(); // 파이 각도

              const x = radius * Math.sin(theta) * Math.cos(phi)*10;
              const y = radius * Math.sin(theta) * Math.sin(phi)*-10;
              const z = radius * Math.cos(theta)*10;

              const textTexture = createTextTexture(texts[textIndex % texts.length]); // 각 박스에 유한 텍스트 할당

              // 텍스처 반복 정
              textTexture.wrapS = THREE.RepeatWrapping;
              textTexture.wrapT = THREE.RepeatWrapping;
              textTexture.repeat.set(5, 1); // 텍스처 반복 횟수 설정

              const sphereMaterial = new THREE.MeshBasicMaterial({
                  map: textTexture,
              });
              const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
              sphereMesh.position.set(x, y, z); // 위치 설
              scene.add(sphereMesh);
              spheres.push(sphereMesh);

              textIndex++; // 다음 스트로 이동
          }
          return spheres;
      }

      // 구 배열 생성 호출
      const spheresResult1 = createSpheres(3); // 3x3x3 배열 생성

      // 마우스 위치 추을 위한 변수
      const mouse = new THREE.Vector2();
      const raycaster = new THREE.Raycaster();

      // 우스 이동 이벤트 리스너 추가
      window.addEventListener('mousemove', onMouseMove, false);

      function onMouseMove(event) {
          // 마우스 위치를 정규화된 장치 좌표로 변환
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }

      // 애니메이션 루프
      function animate() {
          requestAnimationFrame(animate);

          // 마우스 위치에 따라 레이캐���터 업데이트
          raycaster.setFromCamera(mouse, camera);

          // 구체와의 교차점 계산
          const intersects = raycaster.intersectObjects(spheresResult1);

          // 모든 구체의 목표 크기를 초기화
          spheresResult1.forEach(sphere => {
              sphere.userData.targetScale = 1;
          });

          // 교차된 구체의 목표 크기를 증가
          if (intersects.length > 0) {
              const intersectedSphere = intersects[0].object;
              intersectedSphere.userData.targetScale = 1.2; // 목표 크기 증가
          }

          // 구체의 크기를 목표 크기로 부드럽게 간
          spheresResult1.forEach(sphere => {
              const currentScale = sphere.scale.x; // 현재 크기
              const targetScale = sphere.userData.targetScale; // 목표 크기
              const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1); // 보간
              sphere.scale.set(newScale, newScale, newScale);

              sphere.rotation.y += 0.01;
              sphere.position.y += (Math.random() - 0.01) * Math.sin(sphere.rotation.y) * 0.03;
          });

          renderer.render(scene, camera);
      }
      animate();
  // </script>