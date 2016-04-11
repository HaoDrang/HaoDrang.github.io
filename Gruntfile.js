module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),

		uglify:{
			option:{
				stripBanner:true,
				banner : '/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			/*
			build:{
				src:'src/*.js',
				dest:'build/src/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
			},
			*/
			boostrap:{
				src:'src/boostrap.js',
				dest:'build/src/boostrap.min.js'
			},
			preload:{
				src:['src/preload.js','src/resizestage.js'],
				dest:'build/src/preload.min.js'
			}
		},

		jshint:{
			option:{
				jshintrc:'.jshintrc'
			},
			gruntfile:['Gruntfile.js'],
			jsmain:['src/*.js']
		},
		
		csslint:{
			option:{
				csslintrc:'.csslintrc',
				build:['src/*.css']
			}
		},

		watch:{
			options:{spawn:false},
			files:['src/*.js','src/*.css','Gruntfile.js'],	
			tasks:['jshint','csslint','uglify','copy']
		},

		copy:{
			main:{
				files:[
				{
					expand:true,
					cwd:'src/images',
					src:'**',
					flatten:false,
					filter:'isFile',
					dest:'build/images'
				},
				{
					expand:true,
					cwd:'src/dependencies',
					src:'createjs-2015.11.26.min.js',
					flatten:false,
					filter:'isFile',
					dest:'build/src/lib',
					rename:function(dest,src){return dest + '/createjs.js';}
				},
				{
					expand:true,
					cwd:'htmls',
					src:'build-index.html',
					flatten:false,
					filter:'isFile',
					dest:'build',
					rename:function(dest,src){return dest + '/index.html';}
				}
				]
			}
		},

		connect:{
			server:{
				options:{
					port:8000,
					hostname:'*',
					base:'build',
					open:{
						target:'http://localhost:8000',
						appName:'open',
						callback: function(){}
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default',['csslint', 'jshint','uglify','copy','connect','watch']);
};