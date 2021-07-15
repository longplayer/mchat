<template>
  <div class="container testycool pb-10">
    <h1>Welcome to the Testycool Page</h1>
    <hr class="my-10">
    <CatLogoLines/>
    <hr class="my-10">
    <CatLogoColored/>
    <hr class="my-10">
    <CatLogoAnimated/>
    <button class="btn btn__primary">Button</button>
    <br><br>
    <button class="btn btn__secondary">Button</button>
    <hr class="my-10">
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a egestas ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse tincidunt nunc vitae mauris convallis ullamcorper. Vestibulum malesuada sem orci, vitae congue lectus pharetra eu. Donec vitae vestibulum lectus. Aenean vestibulum, est a condimentum facilisis, nulla tortor egestas odio, at laoreet magna ipsum et odio. Nullam tempor felis vel purus aliquet, in dignissim diam pharetra. Pellentesque vulputate ut ex molestie volutpat. Maecenas accumsan pretium nulla vitae tincidunt. Donec vitae enim cursus enim aliquet sodales. Vestibulum eu feugiat ligula. Quisque diam lorem, condimentum et commodo at, auctor a orci.
      <br><br>
      Donec ac libero consectetur, gravida nunc ut, ullamcorper urna. Phasellus quis sapien dictum, laoreet diam eu, luctus erat. Mauris fermentum id velit sed convallis. Praesent non sodales ex, finibus molestie metus. Sed id varius velit. Ut nisl ante, iaculis vitae arcu vitae, suscipit condimentum nulla. In malesuada dapibus massa, ac semper ante dapibus ut. In quam lorem, bibendum ac pellentesque id, aliquet sed quam. Duis dictum porta ex, non dictum metus sollicitudin non.
    </p>
    <hr class="my-10">
  </div>
</template>

<script>
import CatLogoAnimated from '@components/CatLogoAnimated.vue'
import CatLogoColored from '@components/CatLogoColored.vue'
import CatLogoLines from '@components/CatLogoLines.vue'
export default {
  components: {
    CatLogoAnimated,
    CatLogoColored,
    CatLogoLines,
  }
}
</script>
