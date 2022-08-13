<template>
	<el-form ref="loginForm" :model="form" :rules="rules" label-width="0" size="large">
		<el-form-item prop="user">
			<el-input v-model="form.user" prefix-icon="el-icon-user" clearable :placeholder="$t('login.userPlaceholder')">
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input v-model="form.password" prefix-icon="el-icon-lock" clearable show-password
				:placeholder="$t('login.PWPlaceholder')"></el-input>
		</el-form-item>
		<el-form-item style="margin-bottom: 10px">
			<el-col :span="12">
				<el-checkbox :label="$t('login.rememberMe')" v-model="form.autologin"></el-checkbox>
			</el-col>
			<!-- 忘记密码 -->
			<!-- <el-col :span="12" class="login-forgot">
				<router-link to="/reset_password">{{ $t("login.forgetPassword") }}？</router-link>
			</el-col> -->
		</el-form-item>
		<el-form-item>
			<el-button type="primary" style="width: 100%" :loading="islogin" round @click="login">{{ $t("login.signIn") }}
			</el-button>
		</el-form-item>
		<!-- 注册 -->
		<!-- <div class="login-reg">
			{{ $t("login.noAccount") }}
			<router-link to="/user_register">{{
					$t("login.createAccount")
			}}</router-link>
		</div> -->
	</el-form>
</template>

<script>
export default {
	data() {
		return {
			userType: "",
			form: {
				user: "admin",
				password: "admin",
				autologin: false,
			},
			rules: {
				user: [
					{
						required: true,
						message: this.$t("login.userError"),
						trigger: "blur",
					},
				],
				password: [
					{
						required: true,
						message: this.$t("login.PWError"),
						trigger: "blur",
					},
				],
			},
			islogin: false,
		};
	},
	watch: {
		userType(val) {
			if (val == "admin") {
				this.form.user = "admin";
				this.form.password = "admin";
			} else if (val == "user") {
				this.form.user = "user";
				this.form.password = "user";
			}
		},
	},
	mounted() { },
	methods: {
		async login() {
			const validate = await this.$refs.loginForm.validate().catch(() => { });
			if (!validate) {
				return false;
			}

			this.islogin = true;
			const data = {
				username: this.form.user,
				password: this.form.password,
			};
			//获取token
			const user = await this.$API.auth.loginApi(data);
			if (user.data.token) {
				this.$TOOL.cookie.set("TOKEN", user.data.token, {
					expires: this.form.autologin ? 24 * 60 * 60 : 0,
				});
				//  获取用户信息
				const { data: userInfoData } = await this.$API.auth.userInfoApi();
				this.$TOOL.data.set("USER_INFO", userInfoData);

				//获取菜单和访问权限
				let menu = userInfoData.menus;
				let permissions = userInfoData.ruleNames;
				this.$TOOL.data.set("MENU", menu);
				this.$TOOL.data.set("PERMISSIONS", permissions);
				this.$router.replace({
					path: "/",
				});
				this.$message.success("Login Success 登录成功");
				this.islogin = false;
			} else {
				this.islogin = false;
				this.$message.warning(user.message);
				return false;
			}
		},
	},
};
</script>

<style>
</style>
