<template>
  <div class="management">
    <div class="currency">
      <div class="head">
        <p>
          <span class="active">法币交易</span>
          <span>币币交易</span>
          <span class="detail">明细</span>
        </p>
      </div>
    </div>
    <div class="Bibi">
      <div class="head">
        <p>
          <span class="active">法币交易</span>
          <span>币币交易</span>
          <span>提币</span>
          <span class="detail">明细</span>
        </p>
      </div>
    </div>
    <div class="filling">
      <div class="head">
        <p>
          <span class="active">充币</span>
          <span>提币</span>
          <span class="detail">明细</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
const div1 = document.querySelector('.currency');
</script>
<style lang="scss" scoped>
.management {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.currency {
  width: 40vw;
  height: 35vh;
  margin-left: 2vw;
  background: hotpink;
  position: relative;
}
.Bibi {
  width: 40vw;
  height: 35vh;
  background: rgb(57, 48, 131);
  margin-left: 6vw;
  position: relative;
}
.filling {
  margin-left: 2vw;
  width: 40vw;
  height: 35vh;
  background: rgb(215, 208, 20);
  position: relative;
}
.head {
  width: 100%;
  height: 40px;
  border-bottom: cornsilk 1px solid;
}
.active {
  position: relative;
  font-weight: 600;
  color: #2d8cf0;
  left: 15px;
  cursor: pointer;
}
.active:after {
  position: absolute;
  left: 0;
  bottom: -20px;
  content: ' ';
  width: 100%;
  height: 0;
  border-top: 3px solid #2d8cf0;
}
span {
  margin-left: 30px;
  cursor: pointer;
}
.detail {
  position: absolute;
  right: 20px;
  color: #2b85e4;
  cursor: pointer;
}
</style>
