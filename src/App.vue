<template>
  <nav id="nav">
    <router-link to="/buttonDemo">按钮组件</router-link>
    |
    <router-link to="/checkboxDemo">复选框组件</router-link>
    |
    <router-link to="/listDemo">列表组件</router-link>
    |
    <router-link to="/inputDemo">输入框组件</router-link>
    |
    <router-link to="/selectDemo">下拉框组件</router-link>
    |
    <router-link to="/paginationDemo">分页组件</router-link>
    |
    <router-link to="/iconDemo">icon组件</router-link>
    |
    <router-link to="/dropDownDemo">dropDown组件</router-link>
    |
    <router-link to="/modalDemo">modal组件</router-link>
    |
    <router-link to="/treeDemo">Tree 组件</router-link>
    |
    <router-link to="/confirmDemo">confirm 组件</router-link>
    |
    <router-link to="/badgeDemo">badge 组件</router-link>
    |
    <router-link to="/tabsDemo">tabs组件</router-link>
    |
    <router-link to="/switchDemo">switch组件</router-link>
    |
    <router-link to="/drawerDemo">抽屉组件</router-link>
    |
    <router-link to="/messageDemo">message 组件</router-link>
    |
    <router-link to="/noticeDemo">notice 组件</router-link>
    |
    <router-link to="/radioDemo">radio 组件</router-link>
  </nav>
  <router-view />
</template>

<script setup lang="ts"></script>

<style>
ol,
ul,
li {
  list-style: none;
}

.clearfix::after {
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
  content: ".";
}

#app {
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  margin-bottom: 20px;
  text-align: center;
}

.router-link-active {
  font-weight: bold;
  color: #ff8246;
}
</style>
