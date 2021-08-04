<template>
  <div class="container testycool pb-10 min-h-screen">
    <h1>Welcome to the Testycool Page</h1>
    <div class="playground">
      <div class="demo">
        <div class="demo__content">
          <div class="demo__elems">
            <div class="demo__elem demo__elem-1">With advertising online</div>
            <div class="demo__elem demo__elem-2">With a website</div>
            <div class="demo__elem demo__elem-3">I need help with both</div>
            <span class="demo__hover demo__hover-1"></span>
            <span class="demo__hover demo__hover-2"></span>
            <span class="demo__hover demo__hover-3"></span>
            <div class="demo__highlighter">
              <div class="demo__elems">
                <div class="demo__elem">With advertising online</div>
                <div class="demo__elem">With a website</div>
                <div class="demo__elem">I need help with both</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>

/* https://codepen.io/suez/pen/XJGOyL */
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html, body {
  font-size: 62.5%;
  height: 100%;
  
  @media (max-width: 768px) {
    font-size: 50%;
  }
}


/*
$liHeight: 7rem;
$contentPTop: 22rem;
$trans: 0.4s;
$transFast: 0.2s;
$cub: cubic-bezier(.59,.04,.3,1.43);

@mixin hoverLi($y) {
  transform: translateY($y);

  .demo__elems {
    transform: translateY(0 - $y);
  }
}

*/


/* postcss-mixins way (doesn't work) */
@define-mixin hoverLi $axisValue {
  .demo__highlighter {
    transform: translateY($axisValue);

    .demo__elems {
      transform: translateY(0 - $axisValue);
    }
  }
}


.demo {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -18rem;
  margin-top: -10.5rem;
  width: 36rem;
  height: 21rem;
  background: #FFFFFF;
  box-shadow: 0 0.5rem 5rem rgba(0,0,0,0.4);
  
  &__content {
    position: relative;
    height: 100%;
  }
  &__heading {
    font-size: 2.2rem;
    line-height: var(--liHeight);
    padding-left: 3rem;
    color: #313131;
  }
  &__elems {
    position: relative;
    height: 21rem;
  }
  &__elem {
    position: relative;
    height: var(--liHeight);
    font-size: 1.8rem;
    line-height: var(--liHeight);
    padding-left: 3rem;
    border-top: 1px solid #e7e7e7;
  }
  
  &__hover {
    z-index: 2;
    position: absolute;
    left: 0;
    width: 100%;
    height: var(--liHeight);
    cursor: pointer;
    
    &-1 {
      top: 0;

      &:hover ~ {
        /* @mixin hoverLi 0 {
          color: inherit;
        } */
        .demo__highlighter {
          /* @include hoverLi(0); */
          transform: translateY(0);
          .demo__elems {
            transform: translateY(calc(0 - 0));
          }

        }
      }
    }
    &-2 {
      top: var(--liHeight);

      &:hover ~ {
        /* @mixin hoverLi var(--liHeight) {
          color: inherit;
        } */
        .demo__highlighter {
          /* @include hoverLi(var(--liHeight)); */
          transform: translateY(var(--liHeight));
          .demo__elems {
            transform: translateY(calc(0 - var(--liHeight)));
          }
        }
      }
    }
    &-3 {
      top: calc(var(--liHeight) * 2);
      
      &:hover ~ {
        /* @mixin hoverLi calc(var(--liHeight)*2) {
          color: inherit;
        } */
        .demo__highlighter {
          /* @include hoverLi(var(--liHeight)*2); */
          transform: translateY(calc(var(--liHeight) * 2));
          .demo__elems {
            transform: translateY(calc(0 - calc(var(--liHeight) * 2)));
          }
        }
      }
    }
  }
  
  &__highlighter {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 36rem;
    height: var(--liHeight);
    background: #39A5F7;
    overflow: hidden;
    transition: transform 0.5s var(--cub);
    
    .demo__elems {
      position: absolute;
      top: 0;
      left: 0;
      transition: transform 0.5s var(--cub);
    }
    .demo__elem {
      color: #fff;
      border: none;
    }
  }
}
</style>
