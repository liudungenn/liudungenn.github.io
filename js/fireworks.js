<!DOCTYPE html>
<html>
<head>
    <title>鼠标移动放烟花</title>
    <style>body { margin: 0; background: #000; } canvas { display: block; }</style>
</head>
<body>
    <canvas id="fireCanvas"></canvas>
    <script>
        const canvas = document.getElementById('fireCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particles = [];

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 6 - 3;
                this.speedY = Math.random() * 6 - 3;
                this.color = `rgb(${Math.random()*255|0},${Math.random()*255|0},${Math.random()*255|0})`;
                this.life = 60;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.size *= 0.95;
                this.life--;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        canvas.addEventListener('mousemove', (e) => {
            for (let i = 0; i < 5; i++) particles.push(new Particle(e.clientX, e.clientY));
        });

        function animate() {
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.update();
                p.draw();
                if (p.life <= 0) particles.splice(i, 1);
            });
            requestAnimationFrame(animate);
        }
        animate();
    </script>
</body>
</html>