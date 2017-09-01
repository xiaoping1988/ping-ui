<template>
    <div id="pingwaves" style="height:100%;width:100%;position:absolute"></div>
</template>

<script>
  import * as Three from 'three'
  export default {
      name: 'pingwaves',
      props: {
          fov: { // 相机视锥体垂直视角，从下到上的观察角度。
              type: Number,
              default: 120
          },
          color: { // 粒子颜色
              type: String,
              default: 'FFFFFF'
          },
          separation: { // 粒子间距
              type: Number,
              default: 40
          },
          amountx: { // x轴粒子数量
              type: Number,
              default: 100
          },
          amounty: { // y轴粒子数量
              type: Number,
              default: 90
          }
      },
      data () {
          return {
              container: null, // 容器
              camera: null, // 相机
              scene: new Three.Scene(), // 场景
              particles: [], // 粒子
              renderer: null, // 渲染器
              windowHalfX: window.innerWidth / 2,
              windowHalfY: window.innerHeight / 2,
              mouseX: 85,
              mouseY: -342,
              count: 0
          }
      },
      methods: {
          init () {
              this.container = document.getElementById('pingwaves')
              this.camera = new Three.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1000)
              this.camera.position.z = 1000
              this.color = this.color.replace('#', '')

              let material = new Three.SpriteMaterial({
                color: parseInt('0x' + this.color)
              })
              let i = 0
              let particle
              for (let ix = 0; ix < this.amountx; ix++) {
                  for (let iy = 0; iy < this.amounty; iy++) {
                      particle = this.particles[i] = new Three.Sprite(material)
                      i++
                      particle.position.x = ix * this.separation - ((this.amountx * this.separation) / 2)
                      particle.position.z = iy * this.separation - ((this.amountx * this.separation) / 2)
                      this.scene.add(particle)
                  }
              }
              this.renderer = new Three.WebGLRenderer({
                  alpha: true
              })
              this.renderer.setSize(window.innerWidth, window.innerHeight)
              this.renderer.setClearColor(0xffffff, 0)
              this.container.appendChild(this.renderer.domElement)

              // 添加事件
              document.addEventListener('mousemove', this.onDocumentMouseMove, false)
              document.addEventListener('touchstart', this.onDocumentTouchStart, false)
              document.addEventListener('touchmove', this.onDocumentTouchMove, false)
              window.addEventListener('resize', this.onWindowResize, false)
          },
          onDocumentMouseMove (event) {
              this.mouseX = event.clientX - this.windowHalfX
              // this.mouseY = event.clientY - this.windowHalfY
          },
          onDocumentTouchStart (event) {
              if (event.touches.length === 1) {
                  event.preventDefault()
                  this.mouseX = event.touches[0].pageX - this.windowHalfX
                  // this.mouseY = event.touches[0].pageY - this.windowHalfY;
              }
          },
          onDocumentTouchMove (event) {
              if (event.touches.length === 1) {
                  event.preventDefault()
                  this.mouseX = event.touches[0].pageX - this.windowHalfX
                  // this.mouseY = event.touches[0].pageY - this.windowHalfY;
              }
          },
          onWindowResize () {
              this.windowHalfX = window.innerWidth / 2
              this.windowHalfY = window.innerHeight / 2
              this.camera.aspect = window.innerWidth / window.innerHeight
              this.camera.updateProjectionMatrix()
              this.renderer.setSize(window.innerWidth, window.innerHeight)
          },
          animate () {
              requestAnimationFrame(this.animate)
              this.render()
          },
          render () {
            this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05
            this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05
            this.camera.lookAt(this.scene.position)

            let i = 0
            let particle
            for (let ix = 0; ix < this.amountx; ix++) {
              for (let iy = 0; iy < this.amounty; iy++) {
                particle = this.particles[i]
                i++
                particle.position.y = (Math.sin((ix + this.count) * 0.3) * 50) + (Math.sin((iy + this.count) * 0.5) * 50)
                particle.scale.x = particle.scale.y = (Math.sin((ix + this.count) * 0.3) + 1) * 2 + (Math.sin((iy + this.count) * 0.5) + 1) * 2
              }
            }
            this.renderer.render(this.scene, this.camera)
            this.count += 0.1
          }
      },
      mounted () {
          this.$nextTick(function () {
              this.init()
              this.animate()
          })
      }
  }
</script>
