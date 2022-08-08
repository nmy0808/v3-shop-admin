<template>
	<div class="sceditor">
		<Editor v-model="contentValue" :init="init" :disabled="disabled" :placeholder="placeholder" @onClick="onClick" />
		<NSelectImageDialog ref="selectImageDialogRef"></NSelectImageDialog>
	</div>
</template>

<script>
import API from "@/api";
import Editor from '@tinymce/tinymce-vue'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import 'tinymce/models/dom'

// 引入编辑器插件
import 'tinymce/plugins/code'  //编辑源码
import 'tinymce/plugins/image'  //插入编辑图片
import 'tinymce/plugins/media'  //插入视频
import 'tinymce/plugins/link'  //超链接
import 'tinymce/plugins/preview'//预览
import 'tinymce/plugins/template'//模板
import 'tinymce/plugins/table'  //表格
import 'tinymce/plugins/pagebreak'  //分页
import 'tinymce/plugins/lists'  //列
import 'tinymce/plugins/advlist'  //列
import 'tinymce/plugins/quickbars'  //快速工具条

export default {
	components: {
		Editor
	},
	props: {
		modelValue: {
			type: String,
			default: ""
		},
		placeholder: {
			type: String,
			default: ""
		},
		height: {
			type: Number,
			default: 500,
		},
		disabled: {
			type: Boolean,
			default: false
		},
		customUpload: {
			type: Function,
			default: null
		},
		plugins: {
			type: [String, Array],
			default: 'code image media link preview table quickbars template pagebreak lists advlist'
		},
		toolbar: {
			type: [String, Array],
			default: 'undo redo |  forecolor backcolor bold italic underline strikethrough link | blocks fontfamily fontsize | \
					alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | pagebreak | \
					image media table template preview | code selectall imageSelect'
		},
		templates: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			init: {
				that: () => this,
				language_url: 'tinymce/langs/zh_CN.js',
				language: 'zh_CN',
				skin_url: 'tinymce/skins/ui/oxide',
				content_css: "tinymce/skins/content/default/content.css",
				menubar: false,
				statusbar: true,
				plugins: this.plugins,
				toolbar: this.toolbar,
				font_size_formats: '12px 14px 16px 18px 22px 24px 36px 72px',
				height: this.height,
				placeholder: this.placeholder,
				branding: false,
				resize: true,
				elementpath: true,
				content_style: "",
				templates: this.templates,
				quickbars_selection_toolbar: 'forecolor backcolor bold italic underline strikethrough link',
				quickbars_image_toolbar: 'alignleft aligncenter alignright',
				quickbars_insert_toolbar: false,
				image_caption: true,
				image_advtab: true,
				images_upload_handler: (blobInfo) => {
					return new Promise((resolve, reject) => {
						// const data = new FormData();
						// data.append("file", blobInfo.blob() ,blobInfo.filename());
						// API.common.upload.post(data).then((res) => {
						// 	resolve(res.data.src)
						// }).catch(() => {
						// 	reject("Image upload failed")
						// })
						if (this.customUpload) {
							this.customUpload(blobInfo.blob())
								.then(imgUrl => {
									resolve(imgUrl)
								})
						} else {
							reject("上传失败")
						}
					})
				},
				setup: function (editor) {
					editor.on('init', function () {
						this.getBody().style.fontSize = '14px';
					})
					// 增加图库选择菜单项目
					editor.ui.registry.addButton('imageSelect', {
						tooltip: '打开图库',
						icon: 'image',
						onAction: () => {
							this.that().$refs.selectImageDialogRef.open((imgs) => {
								const htmlList = imgs.map(img => {
									const url = img.url
									return `<img src='${url}'>`
								})
								const html = htmlList.join("")
								editor.insertContent(html)
							})
						}
					})
				}
			},
			contentValue: this.modelValue
		}
	},
	watch: {
		modelValue(val) {
			this.contentValue = val
		},
		contentValue(val) {
			this.$emit('update:modelValue', val);
		}
	},
	mounted() {
		tinymce.init({})
	},
	methods: {
		onClick(e) {
			this.$emit('onClick', e, tinymce)
		},
		selectImageAction(editor) {
			this.$refs.selectImageDialogRef.open((imgs) => {
				const html = imgs.map(img => {
					const eImg = new Image(img)
					return eImg
				})
				editor.insertContent(html)
			})
		}
	}
}
</script>

<style>
</style>
