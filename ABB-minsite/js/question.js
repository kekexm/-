	/*请求问题*/
			getQuestionLists();
			function getQuestionLists(){
				$.ajax({
			    	url: "http://abb2016.adtmr.com//question/mobile/16101401",
			    	type:"post",
			    	dataType:"jsonp",
			    	success: function(data){
			    		if(data.state != "0"){
			    			questionFlex(data.message);
			    			return false;
			    		}else{
			    			//console.log(data.data.list);
			    			var questionLists = data.data.list;
			    			//console.log(questionLists.length);
			    			for(var i=0;i<questionLists.length;i+=2){
			    				var quesType = questionLists[i].subjectType;
			    				if(quesType == '1'|| quesType == '2'){
			    					if(i==16){
			    						queSelect2(quesType,questionLists[i],questionLists[i+1]);
			    					}else if(i==14){
			    						queSelectNo7(quesType,questionLists[i],questionLists[i+1]);
			    					}else{
			    						queSelect(quesType,questionLists[i],questionLists[i+1]);
			    					}
			    					
			    				}else if(quesType=='3'){
			    					queTianKong(questionLists[i],questionLists[i+1]);
			    				}else{
			    					moreChid(questionLists[i],questionLists[i+1]);
			    				}
			    			}
			    			initClickEvent();	
			    		}	
			    	},
			    	error : function(){
			    		questionFlex('系统繁忙，请稍后再试！')
			    	}
				});
			}


			/*处理选择题*/

			function queSelect(type,obj,obj2){
				var htmlArr = [];
				htmlArr.push('<li>');
				htmlArr.push('<h2 subjectid='+ obj.subjectid+'>'+obj.title+'<span>'+obj2.title+'</span></h2>');
				htmlArr.push('<p>');

				var options = obj.questionOptions;
				var options2 = obj2.questionOptions;
				for(var i=0;i<options.length;i++){
					if(type=='1'){
						if(options[i].isother=='true'){
							//console.log(options[i].name)
							htmlArr.push('<span>'+options[i].name+'<input type="text" optionid='+options[i].optionid+'><em>'+options2[i].name+'</em></span>')
						}else{
							htmlArr.push('<span>'+options[i].name+'<i attrNum='+type+' optionid='+options[i].optionid+' subjectid='+ options[i].subjectid+'></i><em>'+options2[i].name+'</em></span>')
						}
					}else{
						if(options[i].isother=='true'){
							htmlArr.push('<span>'+options[i].name+'<em>'+options2[i].name+'</em><textarea></textarea></span>')
						}else{
							htmlArr.push('<span>'+options[i].name+'<a class="rect" attrNum='+type+' optionid='+options[i].optionid+' subjectid='+ options[i].subjectid+'></a><em>'+options2[i].name+'</em></span>')
						}
					}
					
				}
				htmlArr.push('</p></li>');
				$("#quesLists").append(htmlArr.join(''));
			}
			//特殊的单选题
			function queSelect2(type,obj,obj2){
				var htmlArr = [];
				htmlArr.push('<li>');
				htmlArr.push('<h2 subjectid='+ obj.subjectid+'>'+obj.title+'<span>'+obj2.title+'</span></h2>');
				htmlArr.push('<p>');

				var options = obj.questionOptions;
				var options2 = obj2.questionOptions;
				for(var i=0;i<options.length;i++){
					htmlArr.push('<span optionid='+options[i].optionid+' subjectid='+ options[i].subjectid+'>'+options[i].name+'<b quesIndex="j4">5</b><b quesIndex="j3">4</b><b quesIndex="j2">3</b><b quesIndex="j1">2</b><b quesIndex="j0">1</b><em>'+options2[i].name+'</em></span>')
				}
				htmlArr.push('</p></li>');
				$("#quesLists").append(htmlArr.join(''));
			}


			/*第七题比较特殊(多加了一个题，现在为第八题)*/

			function queSelectNo7(type,obj,obj2){
				var htmlArr = [];
				htmlArr.push('<li>');
				htmlArr.push('<h2 subjectid='+ obj.subjectid+'>'+obj.title+'<span>'+obj2.title+'</span></h2>');
				htmlArr.push('<p>');

				var options = obj.questionOptions;
				var options2 = obj2.questionOptions;

				for(var i=0;i<options.length;i++){
						if(options[i].isother=='true'){
							htmlArr.push('<span stype="other">'+options[i].name+'<em>'+options2[i].name+'</em><textarea qType="no7"></textarea></span>')
						}else{
							htmlArr.push('<span>'+options[i].name+'<i attrNum='+type+' optionid='+options[i].optionid+' subjectid='+ options[i].subjectid+'></i><em>'+options2[i].name+'</em></span>')
						}
				}
				htmlArr.push('</p></li>');
				$("#quesLists").append(htmlArr.join(''));
			}

			/*填空题*/

			function queTianKong(obj,obj2){
				var htmlArr = [];
				htmlArr.push('<li>');
				htmlArr.push('<h2 subjectid='+ obj.subjectid+'>'+obj.title+'<span>'+obj2.title+'</span></h2>');
				htmlArr.push('<p>');

				var options = obj.questionOptions;
				var options2 = obj2.questionOptions;
				if(options.length=='2'){
					htmlArr.push('<span stype="other">'+options[0].name+'<em>'+options2[0].name+'</em><input type="text" optionid='+options[0].optionid+' subjectid='+options[0].subjectid+'></span><span class="clearfix" stype="other">'+options[1].name+'<textarea name="" id="" class="ly" subjectid='+options[1].subjectid+' optionid='+options[1].optionid+'></textarea><em>'+options2[1].name+'</em></span>');
				}else{
					htmlArr.push('<span class="bg"><textarea subjectid='+ obj.subjectid+'></textarea></span>');
				}
				
				htmlArr.push('</p></li>');
				$("#quesLists").append(htmlArr.join(''));

			}

			/*多个子问题*/

			function moreChid(obj,obj2){
				var htmlArr = [];
				htmlArr.push('<li>');
				htmlArr.push('<h2 subjectid='+ obj.subjectid+'>'+obj.title+'<span>'+obj2.title+'</span></h2>');
				htmlArr.push('<h2 class="h2-po clearfix"><em>不满意Poor</em><em>一般Good</em><em>满意Satisfied</em></h2>');
				htmlArr.push('<p>');

				var subjects = obj.subjects;
				var subjects2 = obj2.subjects;
				for(var i=0;i<subjects.length;i++){
					if(i<subjects.length-1){
						htmlArr.push('<span>'+subjects[i].title);
							for(var j=subjects[i].questionOptions.length-1; j>=0; j--){
								htmlArr.push('<strong optionid='+subjects[i].questionOptions[j].optionid+' subjectid='+ subjects[i].questionOptions[j].subjectid+'></strong>')
							}
						htmlArr.push('<em>'+subjects2[i].title+'</em></span>');
					}else{
						htmlArr.push('<span>'+subjects[i].title+'<em>'+subjects2[i].title+'</em>');
						htmlArr.push('<textarea subjectid='+ subjects[i].questionOptions[0].subjectid+'></textarea>');
						htmlArr.push('</span>');
					}
				}
				
				htmlArr.push('</p></li>');
				$("#quesLists").append(htmlArr.join(''));

			}


			/*第一题判断是否做完*/
			function submitQues(numId){
				var $this = $("#quesLists li").eq(numId);
				var avt = $this.find("i").hasClass("active");
				var avtA = $this.find('a.rect').hasClass("active");
				var actB = $this.find('b.active');
				var actS = $this.find('strong.active');
				var content = $this.find("input").val();
				var textareaVal = $this.find('textarea').val();

				if(numId==2){
					if(!content || !textareaVal){
						questionFlex('理由和品牌均不能为空！');
						return false;
					} 
				}else if(numId==3||numId==5){
					if(avtA==false){
						questionFlex('请选择您的答案！');
						return false;
					}
				}else if(numId==6||numId==10){
					if(!textareaVal){
						questionFlex('请在文本框填写您的答案！');
						return false;
					} 
				}else if(numId==8){
					if(actB.length<5){
						questionFlex('请您对五个因素进行排序！');
						return false;
					}
				}else if(numId==9){
					if(actS.length<5){
						questionFlex('请您对所有安排进行评价！');
						return false;
					}
				}else{
					if(avt==false&&!content){
						questionFlex('请选择您的答案！');
						return false;
					};
				}
					return true;
			}
			

		