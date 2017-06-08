jQuery(function(){
			var json = sessionStorage.getItem('inventoryPrint_json');
			var obj = eval('(' + json + ')');
			var goodsArr = obj.goodsList;
			var html = '';
			for(var i=0;i<goodsArr.length;i++){
				var goods = goodsArr[i];
				var goodsCode = goods.good_code;
				var goodsName = goods.good_name;
				var goodsSpec = goods.goods_spec;
				var goodsNum = goods.goods_num;
				var inventoryNum = goods.inventory_num;
				var profitLoss = goods.profit_loss;
				var levelName = goods.level_name;
				html += '<tr>';
				html += '<td class="ze_bg2">' + goodsCode + '</td>';
				html += '<td class="ze_bg2">' + goodsName + '</td>';
				html += '<td class="ze_bg2">' + levelName + '</td>';
				html += '<td class="ze_bg2">' + goodsSpec + '</td>';
				html += '<td class="ze_bg2">' + goodsNum + '</td>';
				html += '<td class="ze_bg2">' + inventoryNum + '</td>';
				html += '<td class="ze_bg2">' + profitLoss + '</td>';
				html += '</tr>';
			}
				jQuery('#table_list').append(html);
		});
		
		function closeAll(){
			if(confirm('是否关闭打印页面!')){
				window.close();
			}else{
				jQuery('#printButton').html(obj);
			}
		}
		function printButtonClick(){
			obj = jQuery("#printButton").clone();
			jQuery("#printButton").empty();
			jQuery("#rightPanel").printArea();
		}