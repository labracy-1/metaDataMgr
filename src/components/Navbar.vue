<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="success">
        <b-navbar-brand to="/">数据管理平台</b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/standrd">数据标准管理</b-nav-item>
                <b-nav-item to="#" disabled>元数据定义</b-nav-item>
                <b-nav-item to="#" disabled>数据资源目录管理</b-nav-item>
                <b-nav-item to="#" disabled>数据采集管理</b-nav-item>
                <b-nav-item to="#" disabled>数据预处理管理</b-nav-item>
                <b-nav-item to="#" disabled>数据存储管理</b-nav-item>
                <b-nav-item to="#" disabled>数据质量管理</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template slot="button-content"><em>User</em></template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
  }
}
</script>