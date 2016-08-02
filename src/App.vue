<template>
  <scroller lock-y :scrollbar-x="false">
    <div class="box1">
      many many content
    </div>
  </scroller>
</template>

<script type="text/babel">
import scroller from 'vux/src/components/scroller'

export default {
    components: {
      scroller
    }
}
</script>