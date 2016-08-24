import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MultiPicker} from '../../../ion-multi-picker';

@Component({
	templateUrl: 'build/pages/advanced/advanced.html',
	directives: [MultiPicker]
})

export class AdvancedExamplePage {
	default = '1 1-2 1-2-2';
	dependentColumns: any[];
	independentColumns: any[];
	cityColumns: any[];


	constructor(private navCtrl: NavController) {
		this.dependentColumns = [
			{
				options: [{ text: '1', value: '1' },
					{ text: '2', value: '2' },
					{ text: '3', value: '3' }]
			},
			{
				options: [{ text: '1-1', value: '1-1', parentVal: '1' },
					{ text: '1-2', value: '1-2', parentVal: '1' },
					{ text: '2-1', value: '2-1', parentVal: '2' },
					{ text: '2-2', value: '2-2', parentVal: '2' },
					{ text: '3-1', value: '3-1', parentVal: '3' },]
			},
			{
				options: [{ text: '1-1-1', value: '1-1-1', parentVal: '1-1' },
					{ text: '1-1-2', value: '1-1-2', parentVal: '1-1' },
					{ text: '1-2-1', value: '1-2-1', parentVal: '1-2' },
					{ text: '1-2-2', value: '1-2-2', parentVal: '1-2' },
					{ text: '2-1-1', value: '2-1-1', parentVal: '2-1' },
					{ text: '2-1-2', value: '2-1-2', parentVal: '2-1' },
					{ text: '2-2-1', value: '2-2-1', parentVal: '2-2' },
					{ text: '2-2-2', value: '2-2-2', parentVal: '2-2' },
					{ text: '3-1-1', value: '3-1-1', parentVal: '3-1' },
					{ text: '3-1-2', value: '3-1-2', parentVal: '3-1' },]
			}
		];

		this.independentColumns = [
			{
				options: [{ text: '1', value: '1' },
					{ text: '2', value: '2' },
					{ text: '3', value: '3' }]
			},
			{
				options: [{ text: '1-1', value: '1-1' },
					{ text: '1-2', value: '1-2' },
					{ text: '2-1', value: '2-1' },
					{ text: '2-2', value: '2-2' },
					{ text: '3-1', value: '3-1' },]
			},
			{
				options: [{ text: '1-1-1', value: '1-1-1' },
					{ text: '1-1-2', value: '1-1-2' },
					{ text: '1-2-1', value: '1-2-1' },
					{ text: '1-2-2', value: '1-2-2' },
					{ text: '2-1-1', value: '2-1-1' },
					{ text: '2-1-2', value: '2-1-2' },
					{ text: '2-2-1', value: '2-2-1' },
					{ text: '2-2-2', value: '2-2-2' },
					{ text: '3-1-1', value: '3-1-1' },
					{ text: '3-1-2', value: '3-1-2' },]
			}
		];

		this.cityColumns = [
			{
				name: 'province',
				options: [{ text: '北京', value: '北京' },
					{ text: '天津', value: '天津' },
					{ text: '上海', value: '上海' },
					{ text: '江苏', value: '江苏' },
					{ text: '浙江', value: '浙江' },
					{ text: '海南', value: '海南' }]
			},
			{
				name: 'city',
				options: [{ parentVal: '江苏', text: '南京', value: '南京' },
					{ parentVal: '江苏', text: '徐州', value: '徐州' },
					{ parentVal: '江苏', text: '连云港', value: '连云港' },
					{ parentVal: '江苏', text: '宿迁', value: '宿迁' },
					{ parentVal: '江苏', text: '淮安', value: '淮安' },
					{ parentVal: '江苏', text: '盐城', value: '盐城' },
					{ parentVal: '江苏', text: '扬州', value: '扬州' },
					{ parentVal: '江苏', text: '泰州', value: '泰州' },
					{ parentVal: '江苏', text: '南通', value: '南通' },
					{ parentVal: '江苏', text: '镇江', value: '镇江' },
					{ parentVal: '江苏', text: '常州', value: '常州' },
					{ parentVal: '江苏', text: '无锡', value: '无锡' },
					{ parentVal: '江苏', text: '苏州', value: '苏州' },
					{ parentVal: '江苏', text: '江阴', value: '江阴' },
					{ parentVal: '江苏', text: '宜兴', value: '宜兴' },
					{ parentVal: '江苏', text: '邳州', value: '邳州' },
					{ parentVal: '江苏', text: '新沂', value: '新沂' },
					{ parentVal: '江苏', text: '金坛', value: '金坛' },
					{ parentVal: '江苏', text: '溧阳', value: '溧阳' },
					{ parentVal: '江苏', text: '常熟', value: '常熟' },
					{ parentVal: '江苏', text: '张家港', value: '张家港' },
					{ parentVal: '江苏', text: '太仓', value: '太仓' },
					{ parentVal: '江苏', text: '昆山', value: '昆山' },
					{ parentVal: '江苏', text: '吴江', value: '吴江' },
					{ parentVal: '江苏', text: '如皋', value: '如皋' },
					{ parentVal: '江苏', text: '海门', value: '海门' },
					{ parentVal: '江苏', text: '启东', value: '启东' },
					{ parentVal: '江苏', text: '大丰', value: '大丰' },
					{ parentVal: '江苏', text: '东台', value: '东台' },
					{ parentVal: '江苏', text: '高邮', value: '高邮' },
					{ parentVal: '江苏', text: '仪征', value: '仪征' },
					{ parentVal: '江苏', text: '扬中', value: '扬中' },
					{ parentVal: '江苏', text: '句容', value: '句容' },
					{ parentVal: '江苏', text: '丹阳', value: '丹阳' },
					{ parentVal: '江苏', text: '兴化', value: '兴化' },
					{ parentVal: '江苏', text: '姜堰', value: '姜堰' },
					{ parentVal: '江苏', text: '泰兴', value: '泰兴' },
					{ parentVal: '江苏', text: '靖江', value: '靖江' },
					{ parentVal: '浙江', text: '杭州', value: '杭州' },
					{ parentVal: '浙江', text: '宁波', value: '宁波' },
					{ parentVal: '浙江', text: '湖州', value: '湖州' },
					{ parentVal: '浙江', text: '嘉兴', value: '嘉兴' },
					{ parentVal: '浙江', text: '舟山', value: '舟山' },
					{ parentVal: '浙江', text: '绍兴', value: '绍兴' },
					{ parentVal: '浙江', text: '衢州', value: '衢州' },
					{ parentVal: '浙江', text: '金华', value: '金华' },
					{ parentVal: '浙江', text: '台州', value: '台州' },
					{ parentVal: '浙江', text: '温州', value: '温州' },
					{ parentVal: '浙江', text: '丽水', value: '丽水' },
					{ parentVal: '浙江', text: '临安', value: '临安' },
					{ parentVal: '浙江', text: '富阳', value: '富阳' },
					{ parentVal: '浙江', text: '建德', value: '建德' },
					{ parentVal: '浙江', text: '慈溪', value: '慈溪' },
					{ parentVal: '浙江', text: '余姚', value: '余姚' },
					{ parentVal: '浙江', text: '奉化', value: '奉化' },
					{ parentVal: '浙江', text: '平湖', value: '平湖' },
					{ parentVal: '浙江', text: '海宁', value: '海宁' },
					{ parentVal: '浙江', text: '桐乡', value: '桐乡' },
					{ parentVal: '浙江', text: '诸暨', value: '诸暨' },
					{ parentVal: '浙江', text: '上虞', value: '上虞' },
					{ parentVal: '浙江', text: '嵊州', value: '嵊州' },
					{ parentVal: '浙江', text: '江山', value: '江山' },
					{ parentVal: '浙江', text: '兰溪', value: '兰溪' },
					{ parentVal: '浙江', text: '永康', value: '永康' },
					{ parentVal: '浙江', text: '义乌', value: '义乌' },
					{ parentVal: '浙江', text: '东阳', value: '东阳' },
					{ parentVal: '浙江', text: '临海', value: '临海' },
					{ parentVal: '浙江', text: '温岭', value: '温岭' },
					{ parentVal: '浙江', text: '瑞安', value: '瑞安' },
					{ parentVal: '浙江', text: '乐清', value: '乐清' },
					{ parentVal: '浙江', text: '龙泉', value: '龙泉' },
					{ parentVal: '海南', text: '海口', value: '海口' },
					{ parentVal: '海南', text: '三亚', value: '三亚' },
					{ parentVal: '海南', text: '文昌', value: '文昌' },
					{ parentVal: '海南', text: '琼海', value: '琼海' },
					{ parentVal: '海南', text: '万宁', value: '万宁' },
					{ parentVal: '海南', text: '东方', value: '东方' },
					{ parentVal: '海南', text: '儋州', value: '儋州' },
					{ parentVal: '海南', text: '五指山', value: '五指山' },
					{ parentVal: '上海', text: '黄浦区', value: '黄浦区' },
					{ parentVal: '上海', text: '浦东新区', value: '浦东新区' },
					{ parentVal: '上海', text: '徐汇区', value: '徐汇区' },
					{ parentVal: '上海', text: '长宁区', value: '长宁区' },
					{ parentVal: '上海', text: '静安区', value: '静安区' },
					{ parentVal: '上海', text: '普陀区', value: '普陀区' },
					{ parentVal: '上海', text: '虹口区', value: '虹口区' },
					{ parentVal: '上海', text: '杨浦区', value: '杨浦区' },
					{ parentVal: '上海', text: '闵行区', value: '闵行区' },
					{ parentVal: '上海', text: '宝山区', value: '宝山区' },
					{ parentVal: '上海', text: '嘉定区', value: '嘉定区' },
					{ parentVal: '上海', text: '金山区', value: '金山区' },
					{ parentVal: '上海', text: '松江区', value: '松江区' },
					{ parentVal: '上海', text: '青浦区', value: '青浦区' },
					{ parentVal: '上海', text: '奉贤区', value: '奉贤区' },
					{ parentVal: '上海', text: '崇明区', value: '崇明区' },
					{ parentVal: '北京', text: '东城区', value: '东城区' },
					{ parentVal: '北京', text: '西城区', value: '西城区' },
					{ parentVal: '北京', text: '朝阳区', value: '朝阳区' },
					{ parentVal: '北京', text: '丰台区', value: '丰台区' },
					{ parentVal: '北京', text: '石景山区', value: '石景山区' },
					{ parentVal: '北京', text: '海淀区', value: '海淀区' },
					{ parentVal: '北京', text: '门头沟区', value: '门头沟区' },
					{ parentVal: '北京', text: '房山区', value: '房山区' },
					{ parentVal: '北京', text: '通州区', value: '通州区' },
					{ parentVal: '北京', text: '顺义区', value: '顺义区' },
					{ parentVal: '北京', text: '昌平区', value: '昌平区' },
					{ parentVal: '北京', text: '大兴区', value: '大兴区' },
					{ parentVal: '北京', text: '怀柔区', value: '怀柔区' },
					{ parentVal: '北京', text: '平谷区', value: '平谷区' },
					{ parentVal: '北京', text: '密云区', value: '密云区' },
					{ parentVal: '北京', text: '延庆区', value: '延庆区' },
					{ parentVal: '天津', text: '和平区', value: '和平区' },
					{ parentVal: '天津', text: '河西区', value: '河西区' },
					{ parentVal: '天津', text: '河北区', value: '河北区' },
					{ parentVal: '天津', text: '滨海新区', value: '滨海新区' },
					{ parentVal: '天津', text: '西青区', value: '西青区' },
					{ parentVal: '天津', text: '北辰区', value: '北辰区' },
					{ parentVal: '天津', text: '宝坻区', value: '宝坻区' },
					{ parentVal: '天津', text: '宁河区', value: '宁河区' },
					{ parentVal: '天津', text: '河东区', value: '河东区' },
					{ parentVal: '天津', text: '南开区', value: '南开区' },
					{ parentVal: '天津', text: '红桥区', value: '红桥区' },
					{ parentVal: '天津', text: '东丽区', value: '东丽区' },
					{ parentVal: '天津', text: '津南区', value: '津南区' },
					{ parentVal: '天津', text: '武清区', value: '武清区' },
					{ parentVal: '天津', text: '静海区', value: '静海区' },
					{ parentVal: '天津', text: '蓟县', value: '蓟县' },
				]
			}
		];
	}
}
