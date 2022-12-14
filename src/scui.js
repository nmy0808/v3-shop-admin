import config from "./config"
import api from './api'
import tool from './utils/tool'
import http from "./utils/request"
import { permission, rolePermission } from './utils/permission'

// import scTable from './components/scTable'
// import scTableColumn from './components/scTable/column.js'
// import scFilterBar from './components/scFilterBar'
// import scUpload from './components/scUpload'
// import scUploadMultiple from './components/scUpload/multiple'
// import scUploadFile from './components/scUpload/file'
// import scFormTable from './components/scFormTable'
// import scTableSelect from './components/scTableSelect'
// import scPageHeader from './components/scPageHeader'
// import scSelect from './components/scSelect'
// import scDialog from './components/scDialog'
// import scForm from './components/scForm'
// import scTitle from './components/scTitle'
// import scWaterMark from './components/scWaterMark'
import scQrCode from './components/scQrCode'

// import scStatusIndicator from './components/scMini/scStatusIndicator'
// import scTrend from './components/scMini/scTrend'

import NContainer from '@/components/nContainer/index.vue'
import NIcon from '@/components/nIcon/index.vue'
import NForm from '@/components/nForm/index.vue'
import NImage from '@/components/nImage/index.vue'
import NAvatar from '@/components/nAvatar/index.vue'
import NTable from '@/components/nTable/index.vue'
import NDrawer from '@/components/nDrawer/index.vue'
import NDrawerForm from '@/components/nDrawerForm/index.vue'
import NSearchHeader from '@/components/nSearchHeader/index.vue'
import NActionHeader from '@/components/nActionHeader/index.vue'
import NEditTag from '@/components/nEditTag/index.vue'
import NImageSelect from '@/components/nImageSelect/index.vue'
import NDialog from '@/components/nDialog/index.vue'
import NSelectImageDialog from '@/components/nSelectImageDialog/index.vue'
import NUploadMultiple from '@/components/nUploadMultiple/index.vue'
import NCountTo from '@/components/nCountTo/index.vue'

import auth from './directives/auth'
import role from './directives/role'
import time from './directives/time'
import copy from './directives/copy'
import errorHandler from './utils/errorHandler'

import * as elIcons from '@element-plus/icons-vue'
import * as scIcons from './assets/icons'

export default {
	install(app) {
		//??????????????????
		app.config.globalProperties.$CONFIG = config;
		app.config.globalProperties.$TOOL = tool;
		app.config.globalProperties.$HTTP = http;
		app.config.globalProperties.$API = api;
		app.config.globalProperties.$AUTH = permission;
		app.config.globalProperties.$ROLE = rolePermission;

		//??????????????????
		// app.component('scTable', scTable);
		// app.component('scTableColumn', scTableColumn);
		// app.component('scFilterBar', scFilterBar);
		// app.component('scUpload', scUpload);
		// app.component('scUploadMultiple', scUploadMultiple);
		// app.component('scUploadFile', scUploadFile);
		// app.component('scFormTable', scFormTable);
		// app.component('scTableSelect', scTableSelect);
		// app.component('scPageHeader', scPageHeader);
		// app.component('scSelect', scSelect);
		// app.component('scDialog', scDialog);
		// app.component('scForm', scForm);
		// app.component('scTitle', scTitle);
		// app.component('scWaterMark', scWaterMark);
		app.component('scQrCode', scQrCode);
		// app.component('scStatusIndicator', scStatusIndicator);
		// app.component('scTrend', scTrend);

		app.component('NContainer', NContainer);
		app.component('NIcon', NIcon);
		app.component('NForm', NForm);
		app.component('NImage', NImage);
		app.component('NAvatar', NAvatar);
		app.component('NTable', NTable);
		app.component('NDrawer', NDrawer);
		app.component('NDrawerForm', NDrawerForm);
		app.component('NSearchHeader', NSearchHeader);
		app.component('NActionHeader', NActionHeader);
		app.component('NEditTag', NEditTag);
		app.component('NImageSelect', NImageSelect);
		app.component('NDialog', NDialog);
		app.component('NSelectImageDialog', NSelectImageDialog);
		app.component('NUploadMultiple', NUploadMultiple);
		app.component('NCountTo', NCountTo);


		//??????????????????
		app.directive('auth', auth)
		app.directive('role', role)
		app.directive('time', time)
		app.directive('copy', copy)

		//????????????el-icon??????
		for(let icon in elIcons){
			app.component(`ElIcon${icon}`, elIcons[icon])
		}
		//????????????sc-icon??????
		for(let icon in scIcons){
			app.component(`ScIcon${icon}`, scIcons[icon])
		}

		//??????async-validator?????????????????????
		window.ASYNC_VALIDATOR_NO_WARNING = 1

		//????????????????????????
		app.config.errorHandler = errorHandler
	}
}
