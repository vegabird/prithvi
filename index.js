var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
app.use(express.static('public'));
var con = mysql.createConnection({
    host: 'localhost'
    , user: 'root'
    , password: ''
    , database: 'reporting'
});
con.connect(function (err) {
    if (err) {
        console.error('Error:- ' + err.stack);
        return;
    }
    else {
        console.log("Connected")
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
var officegen = require('officegen');
var today = new Date();
var path = require('path');
var fs = require('fs');
var async = require ( 'async' );
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/settings')
  },
  filename: function (req, file, cb) {  	
    cb(null, 'compLogo' + '.png');
  }
});
var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/proofs')
  },
  filename: function (req, file, cb) {  	
    cb(null, Date.now() + '.png');
  }
});
var upload = multer({ storage: storage }).single('companyLogo');
var uploadProof = multer({ storage: storage2 }).array('proofExploit');

function generateDoc(projectData, vulnData, proofData, confData, critical, high, medium, low, file_name, res){
	total = critical + high + medium + low;	
	projectData = projectData[0];
	confData = confData[0];	
	
	var docx = officegen ( {
    type: 'docx',
    orientation: 'portrait',
    pageMargins: { top: 1000, left: 1000, bottom: 1000, right: 1000 }    
	} );
	officegen.setVerboseMode ( true );
	docx.on ( 'error', function ( err ) {
            console.log ( 'error: ' + err );
        });
    var pObj = docx.createP ();
    pObj.options.align = 'center';
    pObj.addImage (path.resolve(__dirname + '/public/settings/', 'compLogo.png'));
    pObj.addLineBreak ();
    pObj.addLineBreak ();
    pObj.addLineBreak ();
    pObj.addLineBreak ();
    pObj.addLineBreak ();
    pObj.addLineBreak ();
    pObj.addText (projectData.pname, { bold: true, underline: false, font_face: 'Calibri (Body)', font_size: 28 }); 
    pObj.addLineBreak ();
    pObj.addText (projectData.startdate + ' - ' + projectData.enddate, { bold: true, underline: false, font_face: 'Calibri (Body)', font_size: 28 });
    docx.putPageBreak ();

        var table = [
		      [{
		        val: "Security Analysis Summary",        
		        opts: {            
		            align: "left",
		            b:true,
		            gridSpan: 2,
		            shd: {
		                fill: "c6d9f1"                
		            }
		        }        
		        
		      },{
		        val: "CONFIDENTIAL",
		        opts: {
		          b:true,          
		          align: "center",
		          shd: {
		            fill: "c6d9f1"            
		          }
		        }
		      }],
		      [{
		        val: "PROJECT NAME",
		        opts: {
		          b:true,          
		          align: "left"
		        }
		      },
		      {
		        val: projectData.pname,
		        opts: {
		          b:true,          
		          align: "left"
		        }
		      },      
		      {
		        val: "DATE: " + projectData.enddate + "",
		        opts: {
		          b:true,          
		          align: "left"
		        }
		      }],
		      [{
		        val: "",        
		        opts: {                        
		            gridSpan: 3,
		            shd: {
		            fill: "000000"            
		          }
		        }        
		        
		      }],
		      [{
		        val: "SECURITY ANALYST",        
		        opts: {            
		            align: "left",
		            b:true
		        }        
		      }
		      ,{
		        val: projectData.analystname,        
		        opts: {            
		            align: "left",
		            b:true,
		            gridSpan: 2
		        }        
		        
		      }],
		      [{
		        val: "",        
		        opts: {                        
		            gridSpan: 3,
		            shd: {
		            fill: "333333"            
		          }
		        }        
		        
		      }],
		      [{
		        val: "ISSUES IDENTIFIED",        
		        opts: {                   
		            align: "left",
		            b:true,
		            gridSpan: 3
		        }        
		        
		      }],
		      [{
		        val: "VERY HIGH/CRITICAL",        
		        opts: {            
		            align: "left",
		            b:true
		        }        
		        
		      }, critical, "Should be remediated, or variances obtained prior to production"],
		      [{
		        val: "HIGH",        
		        opts: {            
		            align: "left",
		            b:true
		        }        
		        
		      }, high, "Should be remediated, or obtain variances within 90 days of start of production"],
		      [{
		        val: "MEDIUM",        
		        opts: {            
		            align: "left",
		            b:true
		        }        
		        
		      }, medium, "Information only"],
		      [{
		        val: "LOW",        
		        opts: {            
		            align: "left",
		            b:true
		        }        
		        
		      }, low, "Information only"],
		      [{
		        val: "",        
		        opts: {                        
		            gridSpan: 3,
		            shd: {
		            fill: "333333"            
		          }
		        }        
		        
		      }]
    ]

    var tableStyle = {
      tableColWidth: 4261,      
      tableSize: 24,
      tableColor: "ada",
      tableAlign: "center",
      tableFontFamily: "Calibri (Body)",
      borders: true
    }
    docx.createTable (table, tableStyle);   
    docx.putPageBreak ();    

    var pObj = docx.createP ();    
    pObj.addText('1. EXECUTIVE SUMMARY', { bold: true, font_size: 16 });
    pObj.addLineBreak (); 
    pObj.addText (''+confData.company_name+' security assessment team performed a combined application assessment of the '+projectData.pname+'. A combined application assessment is a type of “ethical hacking” or “intrusion testing” approach for detecting vulnerabilities in a system through a combination of source code review and live application testing. The '+projectData.apptype+' version of '+projectData.pname+' was assessed in the process. The assessment took place between '+projectData.startdate+' - '+projectData.enddate+'. ', { font_size: 12 } );
    pObj.addLineBreak (); 
    pObj.addText ( ''+confData.company_name+' security assessment team identified '+total+' vulnerability.', { font_size: 12 } );
    docx.putPageBreak ();

    var pObj = docx.createP ();
    pObj.addText('Top Vulnerabilities in '+projectData.pname+'', { bold: true, font_size: 12 });
    pObj.addImage (path.resolve(__dirname + '/data/img/', '1.png'));
    docx.putPageBreak ();

    var pObj = docx.createP ();
    pObj.addText('2. ENGAGEMENT OVERVIEW', { bold: true, font_size: 16 });
    pObj.addLineBreak ();
    var back1 = docx.createP ({ backline: 'c6d9f1' });
    back1.addText('1.1 – Scope', { bold: true, font_size: 12, italic: true });
    pObj.addLineBreak ();
    pObj.addText(''+confData.company_name+' security assessment team performed a combined application assessment of '+projectData.pname+' for '+projectData.apptype+'. The assessment occurred between '+projectData.startdate+' - '+projectData.enddate+'.', { font_size: 12 });
    pObj.addLineBreak();
    pObj.addText(''+projectData.pname+' was vulnerable to attack in its current state using live-testing and source-based analysis techniques. Consultants from '+confData.company_name+' security assessment team primarily focused the assessment on the following areas of concern: ', { font_size: 12 });
    var point1 = docx.createListOfDots ();
    point1.addText('General application architecture issues', { font_size: 12 });
    var point1 = docx.createListOfDots ();
    point1.addText('SQL tampering', { font_size: 12 });
    var point1 = docx.createListOfDots ();
    point1.addText('Cross-site scripting (XSS)', { font_size: 12 });
    var point1 = docx.createListOfDots ();
    point1.addText('Session management vulnerabilities', { font_size: 12 });
    var point1 = docx.createListOfDots ();
    point1.addText('Insufficient or ineffective authentication and access control', { font_size: 12 });
    var point1 = docx.createListOfDots ();
    point1.addText('Server path manipulation and traversal (files, directories, etc.)', { font_size: 12 });
    var point1 = docx.createListOfDots ();
    point1.addText('Insufficient or ineffective use of encryption', { font_size: 12 });
    var point1 = docx.createListOfDots ();
    point1.addText('Application related denial of service', { font_size: 12 });
    var point1 = docx.createListOfDots ();
    point1.addText('Sensitive information exposure', { font_size: 12 });
    var point1 = docx.createListOfDots ();
    point1.addText('Platform (public vulnerabilities) and configuration vulnerabilities', { font_size: 12 });
    var point1 = docx.createListOfDots ();
    point1.addText('Any applicable issues not explicitly identified above, but covered by pertinent standards (OWASP Top 10, SANS Top 20)', { font_size: 12 });
    

    var back2 = docx.createP ({ backline: 'c6d9f1' });
    back2.addText('1.2 - Assessment Methodology', { bold: true, font_size: 12, italic: true });
    var pObj = docx.createP ();
    pObj.addText('The Information Security teams follow a combined (whitebox and blackbox) application assessment including the following components:', { font_size: 12 });
    var point2 = docx.createListOfDots ();
    point2.addText('Blackbox assessments include the following live-testing techniques:', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('Spidering—attempts to identify application functionality by automated traversal of site hierarchy and permuting common variations on popular naming conventions', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('Manual fault injection—manual submission of malicious data to identify security vulnerabilities in request path', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('Automated fault injection (fuzzing)—automated submission of a range of malicious data to identify security vulnerabilities in request path', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('Known vulnerability testing—identification of vulnerabilities in the hosting platform (web server, servlet container, etc.) using primarily automated analysis techniques', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('HTTP traffic snipping', { font_size: 12 });

    var point2 = docx.createListOfDots ();
    point2.addText('Whitebox assessments include the following source-based analysis strategies:', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('Code comprehension—manual source code analysis of security-relevant code paths', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('Candidate point—automated analysis to pinpoint known vulnerability patterns, followed by manual analysis to validate any vulnerability candidates', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('Design generalization—analysis of major application structure to validate the security and proper implementation of the design', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('Test code development – developed test code to examine the nature of data transfer and storage', { font_size: 12 });

    var point2 = docx.createListOfDots ();
    point2.addText('Data Correlation:', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('Research vulnerabilities', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('Eliminate false positives', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('Investigate the extent of the findings', { font_size: 12 });

    var point2 = docx.createListOfDots ();
    point2.addText('Documentation provided by the project team, such as technical documentation, data flow diagrams, security whitepapers, assessment surveys and other related information.', { font_size: 12 });

    var point2 = docx.createListOfDots ();
    point2.addText('The review of provided documentation for the verification of project security standards according to the Comprehensive Information Security Policy (CISP).', { font_size: 12 });

    var point2 = docx.createListOfDots ();
    point2.addText('Hands-on review of application, system architecture and vendor(s).', { font_size: 12 });

    var point2 = docx.createListOfDots ();
    point2.addText('Manual and automated security testing utilizing industry-standard tools.', { font_size: 12 });

    var point2 = docx.createListOfDots ();
    point2.addText('Vulnerability severity is scored according to CVSS. http://www.first.org/cvss/cvss-guide', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('Critical: 7.0 -10', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('High: 6.0 – 6.9', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('Medium: 4.0 – 5.9', { font_size: 12 });
    var dots1 = docx.createListOfDots();
    dots1.addText('Low: 0.0 – 3.9',{ font_size: 12 });

    var back3 = docx.createP ({ backline: 'c6d9f1' });
    back3.addText('1.3 - Assessment Assumptions', { bold: true, font_size: 12, italic: true });
    var pObj = docx.createP ();
    pObj.addText('Based on the information provided, the following assumptions have been made as part of this analysis:', { font_size: 12 });
    var point3 = docx.createListOfDots ();
    point3.addText('The data elements identified in this project have been classified as Confidential-Restricted.', { font_size: 12 });
    var point3 = docx.createListOfDots ();
    point3.addText('The scope of the assessment included the Web interactions.', { font_size: 12 });

    var back4 = docx.createP ({ backline: 'c6d9f1' });
    back4.addText('1.4 - Out of Scope', { bold: true, font_size: 12, italic: true });
    var pObj = docx.createP ();
    pObj.addText('None of the items are treated as Out of Scope as part of this assessment.', { font_size: 12 });
    docx.putPageBreak();

    var pObj = docx.createP ();
    pObj.addText('3. SUMMARY OF FINDINGS', { bold: true, font_size: 16 });
    var table = [
      [{
        val: "Vulnerability or Condition Type",        
        opts: {            
            align: "center",
            b:true,
            gridSpan: 2,
            shd: {
                fill: "ccccff"                
            }
        }        
        
      },{
        val: "Risk",
        opts: {
          b:true,          
          align: "center",
          shd: {
            fill: "ccccff"            
          }
        }
      },{
        val: "Severity",
        opts: {
          b:true,          
          align: "center",
          shd: {
            fill: "ccccff"            
          }
        }
      },{
        val: "Retest Status",
        opts: {
          b:true,          
          align: "center",
          shd: {
            fill: "ccccff"            
          }
        }
      }]
    ]
    var detailedtable = [];
	for(j=0;j<vulnData.length;j++){
		table.push(
			[{
	        val: j+1,
	        opts: {
	          b:true,          
	          align: "center",
	          shd: {
	            fill : "ff9900"
	          }
	        }
	      },{
	        val: vulnData[j].vname,
	        opts: {
	          b:true,          
	          align: "center",
	          shd: {
	            fill : "dbe5f1"
	          }
	        }
	      },{
	        val: vulnData[j].risk,
	        opts: {
	          b:true,          
	          align: "center"
	          
	        }
	      },
	      {
	        val: vulnData[j].severity,
	        opts: {                  
	          align: "center"
	        }
	      },      
	      {
	        val: vulnData[j].retest,
	        opts: {                    
	          align: "center"
	        }
	      }]
      	);
      	detailedtable.push([
		      [{
		        val: "Risk",        
		        tableColWidth: 14261,
		        opts: {            
		            b:true,        
		            tableColWidth: 14261,    
		            shd: {
		                fill: "c5d8f1"                
		            }
		        }        
		        
		      }],
		      [vulnData[j].risk],
		      [{
		        val: "Severity",        
		        opts: {            
		            b:true,            
		            shd: {
		                fill: "c5d8f1"                
		            }
		        }        
		        
		      }],
		      [vulnData[j].severity],
		      [{
		        val: "Probability",        
		        opts: {            
		            b:true,            
		            shd: {
		                fill: "c5d8f1"                
		            }
		        }        
		        
		      }],
		      [vulnData[j].probability],
		      [{
		        val: "Remediation Effort",        
		        opts: {            
		            b:true,            
		            shd: {
		                fill: "c5d8f1"                
		            }
		        }        
		        
		      }],
		      [vulnData[j].remeffort],
		      [{
		        val: "CVSS Base Score",        
		        opts: {            
		            b:true,            
		            shd: {
		                fill: "c5d8f1"                
		            }
		        }        
		        
		      }],
		      [vulnData[j].cvscore],
		      [{
		        val: "Vector",        
		        opts: {
		            b:true,            
		            shd: {
		                fill: "c5d8f1"                
		            }
		        }        
		        
		      }],
		      [vulnData[j].vector],
		      [{
		        val: "Occurrences",        
		        opts: {            
		            b:true,            
		            shd: {
		                fill: "c5d8f1"                
		            }
		        }        
		        
		      }],
		      [vulnData[j].occurrences],
		      [{
		        val: "Affected Components",        
		        opts: {            
		            b:true,            
		            shd: {
		                fill: "c5d8f1"                
		            }
		        }        
		        
		      }],
		      [vulnData[j].affcomp],
		      [{
		        val: "Details",        
		        opts: {            
		            b:true,            
		            shd: {
		                fill: "c5d8f1"                
		            }
		        }        
		        
		      }],
		      [vulnData[j].vdetail],            
		      [{
		        val: "Suggested Remediation",        
		        opts: {            
		            b:true,            
		            shd: {
		                fill: "c5d8f1"                
		            }
		        }        
		        
		      }],
		      [vulnData[j].vrecommend]
		])
	}

    var tableStyle = {
      tableColWidth: 4261,      
      tableSize: 24,
      tableColor: "ada",
      tableAlign: "center",
      tableFontFamily: "Calibri (Body)",
      borders: true
    }
    docx.createTable (table, tableStyle);  
    docx.putPageBreak ();

    var pObj = docx.createP ();
    pObj.addText('4. DETAILED FINDINGS', { bold: true, font_size: 16 });
    pObj.addLineBreak();    
    
    var tableStyle = {
      tableColWidth: 14261,      
      tableSize: 24,
      tableColor: "ada",
      tableAlign: "left",
      tableFontFamily: "Calibri (Body)",
      borders: true
    }
    for(k=0; k<detailedtable.length; k++){
    	findcount = k+1;
    	pObj.addText('Finding #'+findcount+': '+vulnData[k].vname+'', { bold: true, font_size: 12, color: '1f497d' });
    	docx.createTable (detailedtable[k], tableStyle);

    	var pObj = docx.createP ();
    	pObj.addText('Proof of Exploit (Finding #'+findcount+')', { bold: true, font_size: 12 });
    	pObj.addLineBreak();
    	proofavailable = false;
    	for(m=0;m<proofData.length;m++){
    		if(proofData[m].vid == vulnData[k].vid){
    			pObj.addImage (path.resolve(__dirname + '/public/proofs/', proofData[m].path));
    			proofavailable = true;
    		}
    	}
    	if(proofavailable == false){
    		pObj.addText('No Attachments', { font_size: 12 });
    	}
    	pObj.addLineBreak();
    }
    var out = fs.createWriteStream (path.resolve(__dirname + '/public/output/', ''+file_name+'.docx' ));

    out.on ( 'error', function ( err ) {
        console.log ( 'error: ' + err );
    });
    out.on ( 'close', function () {
        console.log ( 'Finish to create a DOCX file.' );
        var temp = {"status": "True", "date": today, "filename": file_name};                                        
        res.send(temp);
    });
    docx.generate ( out );  
    // async.parallel ([
    //     function ( done ) {
    //         out.on ( 'close', function () {
    //             console.log ( 'Finish to create a DOCX file.' );
    //             done ( null );
    //         });
    //         docx.generate ( out );
    //     }

    // ], function ( err ) {
    //     if ( err ) {
    //         console.log ( 'error: ' + err );
    //     } // Endif.
    // });
}

app.post('/generate', function(req, res){
	var pid = req.body.id;
	con.query("SELECT * FROM projects where `pid`=?", [pid], function (err, projectData) {
        if (err) {
            throw err;
        }
        else {
        	if(projectData.length > 0){
        		con.query("SELECT * FROM `vulnerabilities` WHERE `pid`=?", [pid], function (err, vulnData) {
		        	if (err) {
		        		throw err;
		        	}
		        	else {
		        		vulID = []
		        		critical=0;
		        		high=0;
		        		medium=0;
		        		low=0;
		        		for(i=0;i<vulnData.length;i++){
		        			vulID.push(vulnData[i].vid);
		        			if(vulnData[i].risk == 'Critical'){
		        				critical = critical + 1;
		        			}
		        			else if(vulnData[i].risk == 'Medium'){
		        				medium = medium + 1;
		        			}
		        			else if(vulnData[i].risk == 'High'){
		        				high = high + 1;
		        			}
		        			else if(vulnData[i].risk == 'Low'){
		        				low = low + 1;
		        			}
		        		}		        		
		        		con.query("SELECT * FROM `proofs` WHERE `vid` IN ("+vulID+")", function (err, proofData) {
		        			if (err) {
		            			throw err;
		        			}
		        			else {
		        				con.query("SELECT * FROM settings", function (err, confData) {
		        					if (err) {
		        						throw err;
		        					}
		        					else {
                                        file_name = Date.now()
		        						generateDoc(projectData, vulnData, proofData, confData, critical, high, medium, low, file_name, res);
		        						
		        					}
		        				});		          				
		        			}
		    			});
		        	}
		    	});				
			}	      	            
        }
    });
});

app.post('/addOwasp', function (req, res) {
    var vname = req.body.vulName;
    var apptype = req.body.appType;
    var vowasp =  req.body.owaspName;
    var vdetail =  req.body.vulDetail;
    var vrecommend =  req.body.vulRecommend;    
    if(vname != undefined && vowasp != undefined && vdetail != undefined && vrecommend != undefined && apptype != undefined){
      con.query("INSERT INTO `owasp` (`vname`, `apptype`, `vowasp`, `vdetail`, `vrecommend`) VALUES (?, ?, ?, ?, ?)", [vname, apptype, vowasp, vdetail, vrecommend], function (err, result) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    if (result.affectedRows == 1) {
                                        console.log("Row Inserted in Owasp");
                                        var temp = {"status": "True", "date": today, "id": result.insertId};
                                        res.send(temp);
                                    }
                                    else {
                                        console.log("Failed : Row Inserted in Owasp");
                                        var temp = {"status": "False", "date": today};
                                        res.send(temp);
                                    }
                                }
                            });
  }
        else{
          var temp = {"status": "False", "date": today};
        res.send(temp);
        }
});
app.post('/viewOwasp', function (req, res) {
	var apptype = req.body.appType;
	if(apptype != undefined){
		  con.query("SELECT `vname` as `vulName` , `apptype` as `appType`, `vowasp` as `owaspName`, `vdetail` as `vulDetail`, `vrecommend` as `vulRecommend` , `ID` as `id` FROM `owasp` where `apptype`=?", [apptype], function (err, result) {
		        if (err) {
		            throw err;
		        }
		        else {
		          var temp = {"status": "True", "date": today, "data": result};
		        res.send(temp);
		            
		        }
		    });  
	}
	else{
		var temp = {"status": "False", "date": today};
        res.send(temp);
	}
});
app.post('/editOwasp', function (req, res) {
    var vname = req.body.vulName;
    var apptype = req.body.appType;
    var vowasp =  req.body.owaspName;
    var vdetail =  req.body.vulDetail;
    var vrecommend =  req.body.vulRecommend;
    var ID =  req.body.id;
    
    if(vname != undefined && vowasp != undefined && apptype != undefined && vdetail != undefined && vrecommend != undefined && ID != undefined){
      con.query("UPDATE `owasp` SET `vname`=?, `apptype`=?, `vowasp`=?,`vdetail`=?,`vrecommend`=? WHERE `ID`=?", [vname, apptype, vowasp, vdetail, vrecommend, ID], function (err, result) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    if (result.affectedRows == 1) {
                                        console.log("Row Updated in Owasp");
                                        var temp = {"status": "True", "date": today};
                                        res.send(temp);
                                    }
                                    else {
                                        console.log("Failed : Row Updated in Owasp");
                                        var temp = {"status": "False", "date": today};
                                        res.send(temp);
                                    }
                                }
                            });
  }
        else{
          var temp = {"status": "False", "date": today};
        res.send(temp);
        }
});
app.post('/deleteOwasp', function (req, res) {
    var ID =  req.body.id;    
    if(ID != undefined){
      con.query("DELETE FROM `owasp` WHERE `ID`=?", [ID], function (err, result) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    if (result.affectedRows == 1) {
                                        console.log("Row Deleted in Owasp");
                                        var temp = {"status": "True", "date": today};
                                        res.send(temp);
                                    }
                                    else {
                                        console.log("Failed : Row Deleted in Owasp");
                                        var temp = {"status": "False", "date": today};
                                        res.send(temp);
                                    }
                                }
                            });
  }
        else{
          var temp = {"status": "False", "date": today};
        res.send(temp);
        }
});

app.post('/setCon', function (req, res) {
    upload(req, res, function (err) {
        console.log(req.file);
        console.log(req.body);
        if (err) {      
          return
        }
        else{
            var company_name = req.body.companyName;
            if(company_name != undefined){
                con.query("TRUNCATE `settings`", function (err, result) {
                    if (err) {
                        throw err;
                    }
                    else {                                  
                        con.query("INSERT INTO `settings`(`company_name`, `company_logo`) VALUES (?, ?)", [company_name, 'compLogo.png'], function (err, result) {
                            if (err) {
                                throw err;
                            }
                            else {
                                if (result.affectedRows == 1) {
                                    console.log("Row Inserted in Settings");
                                    var temp = {"status": "True", "date": today};
                                    res.send(temp);
                                }
                                else {
                                    console.log("Failed : Row Inserted in Settings");
                                    var temp = {"status": "False", "date": today};
                                    res.send(temp);
                                }
                            }
                        });
                    }
                });      
            }
            else{
                var temp = {"status": "False", "date": today};
                res.send(temp);
            }        
        }
    });    
});
app.get('/getCon', function (req, res) {
	con.query("SELECT * FROM settings", function (err, result) {
        if (err) {
            throw err;
        }
        else {
        	var temp = {"status": "True", "date": today, "data": result};
    		res.send(temp);
        }
    });  	
});

app.post('/addProject', function (req, res) {
    var pname = req.body.projectName;
    var company_name = req.body.companyName;
    var apptype =  req.body.appType;
    var startdate =  req.body.startDate;
    var enddate =  req.body.endDate;
    var analystname = req.body.analystName;

    if(pname != undefined && company_name != undefined && apptype != undefined && startdate != undefined && enddate != undefined && analystname != undefined){
      con.query("INSERT INTO `projects` (`pname`, `company_name`, `apptype`, `startdate`, `enddate`, `analystname`) VALUES (?, ?, ?, ?, ?, ?)", [pname, company_name, apptype, startdate, enddate, analystname], function (err, result) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    if (result.affectedRows == 1) {                                        
                                        console.log("Row Inserted in Project");
                                        var temp = {"status": "True", "date": today, "id": result.insertId};
                                        res.send(temp);
                                    }
                                    else {
                                        console.log("Failed : Row Inserted in Project");
                                        var temp = {"status": "False", "date": today};
                                        res.send(temp);
                                    }
                                }
                            });
  }
        else{
          var temp = {"status": "False", "date": today};
        res.send(temp);
        }
});
app.post('/viewProject', function (req, res) {
    var apptype = req.body.appType;
    if(apptype != undefined){
    con.query("SELECT `pid` as `id` , `pname` as `projectName`, `company_name` as `companyName`, `apptype` as `appType`, `startdate` as `startDate` , `enddate` as `endDate` , `analystname` as `analystName` FROM projects where `apptype`=? OR `pid`=?", [apptype, apptype], function (err, result) {
        if (err) {
            throw err;
        }
        else {
          var temp = {"status": "True", "date": today, "data": result};
        res.send(temp);
            
        }
    });
    }
    else{
        var temp = {"status": "False", "date": today};
        res.send(temp);
    }
});
app.post('/editProject', function (req, res) {
    var pname = req.body.projectName;
    var company_name = req.body.companyName;
    var apptype =  req.body.appType;
    var startdate =  req.body.startDate;
    var enddate =  req.body.endDate;
    var analystname = req.body.analystName;
    var pid = req.body.id;       

    if(pname != undefined && company_name != undefined && apptype != undefined && startdate != undefined && enddate != undefined && pid != undefined && analystname != undefined){
      con.query("UPDATE `projects` SET `pname`=?, `company_name`=?, `apptype`=?,`startdate`=?,`enddate`=?, `analystname`=? WHERE `pid`=?", [pname, company_name, apptype, startdate, enddate, analystname, pid], function (err, result) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    if (result.affectedRows == 1) {
                                        console.log("Row Inserted in Project");
                                        var temp = {"status": "True", "date": today};
                                        res.send(temp);
                                    }
                                    else {
                                        console.log("Failed : Row Inserted in Project");
                                        var temp = {"status": "False", "date": today};
                                        res.send(temp);
                                    }
                                }
                            });
  }
        else{
          var temp = {"status": "False", "date": today};
        res.send(temp);
        }
});
app.post('/deleteProject', function (req, res) {
    var pid =  req.body.id;    
    if(pid != undefined){
      con.query("DELETE FROM `projects` WHERE `pid`=?", [pid], function (err, result) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    if (result.affectedRows == 1) {
                                        console.log("Row Deleted in Project");
                                        var temp = {"status": "True", "date": today};
                                        res.send(temp);
                                    }
                                    else {
                                        console.log("Failed : Row Deleted in Project");
                                        var temp = {"status": "False", "date": today};
                                        res.send(temp);
                                    }
                                }
                            });
  }
        else{
          var temp = {"status": "False", "date": today};
        res.send(temp);
        }
});

app.post('/addVuln', function (req, res) {
    uploadProof(req, res, function (err) {        
        var pid = req.body.projectID;
        var vname = req.body.vulName;
        var apptype = req.body.appType;
        var vowasp =  req.body.owaspName;
        var vdetail =  req.body.vulDetail;
        var vrecommend =  req.body.vulRecommend;        
        var risk = req.body.risk;
        var severity = req.body.severity;
        var cvscore = req.body.cvscore;
        var cvtext = req.body.cvtext;
        var probability = req.body.probability;
        var remeffort = req.body.remeffort;
        var vector = req.body.vector;
        var occurrences = req.body.occurrences;
        var affcomp = req.body.affcomp;
        var retest = req.body.retest | "";
        var other = req.body.other | "";
        console.log(req.files);
        
        if (err) {
            throw err;
        }
        else{
            if(pid != undefined && vname != undefined && vowasp != undefined){
                con.query("INSERT INTO `vulnerabilities` (`pid`, `vname`, `vowasp`, `vdetail`, `vrecommend`, `risk`, `severity`, `cvscore`, `cvtext`, `probability`, `remeffort`, `vector`, `occurrences`, `affcomp`, `retest`, `other`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [pid, vname, vowasp, vdetail, vrecommend, risk, severity, cvscore, cvtext, probability, remeffort, vector, occurrences, affcomp, retest, other], function (err, result) {
                    if (err) {
                        throw err;
                    }
                    else {
                        var vulidtemp = result.insertId;
                        var dataProof = [];             
                        for(i = 0; i< req.files.length; i++){
                            temp = [result.insertId, req.files[i].filename];            
                            dataProof.push(temp);
                        }
                        console.log("Row Inserted in Vulnerabilities");
                        if (req.files.length > 0 && result.affectedRows == 1) {                            
                            con.query("INSERT INTO `proofs` (`vid`, `path`) VALUES ?", [dataProof], function (err, result) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    if (result.affectedRows > 0) {
                                        console.log("Row Inserted in Proofs");
                                        var temp = {"status": "True", "date": today, "vid": vulidtemp};
                                        res.send(temp);
                                    }
                                    else {
                                        console.log("Failed : Row Inserted in Proofs");
                                        var temp = {"status": "False", "date": today};
                                        res.send(temp);
                                    }
                                }
                            });                            
                        }
                        else if(result.affectedRows == 1){
                            var temp = {"status": "True", "date": today, "vid": vulidtemp};
                            res.send(temp);
                        }
                        else {
                            console.log("Failed : Row Inserted in Vulnerabilities");
                            var temp = {"status": "False", "date": today};
                            res.send(temp);
                        }
                    }
                });
            }
            else{
                var temp = {"status": "False", "date": today};
                res.send(temp);
            }
        }
    });    
});
app.post('/viewVuln', function (req, res) {
	var pid =  req.body.id;
	if(pid != undefined){
		con.query("SELECT `vid` as `vulID`, `pid` as `projectID`, `vname` as `vulName`, `vowasp` as `owaspName`, `vdetail` as `vulDetail`, `vrecommend` as `vulRecommend`, `risk`, `severity`, `cvscore`, `cvtext`, `probability`, `remeffort`, `vector`, `occurrences`, `affcomp`, `retest`, `other` FROM `vulnerabilities` WHERE `pid`=?", [pid], function (err, result) {
		        if (err) {
		            throw err;
		        }
		        else {
		          	var temp = {"status": "True", "date": today, "data": result};
					res.send(temp);
		        }
		    });
	}
	else{
		var temp = {"status": "False", "date": today};
        res.send(temp);
	}
});
app.post('/viewVulGetImg', function (req, res) {
    var vid = req.body.vid;
    if (vid != undefined) {
        con.query("SELECT `path` as `imgpath` FROM `proofs` WHERE `vid` = ?", [vid], function (err, result) {            
            if (err) {
                throw err;
            }
            else {
                var temp = {
                    "status": "True"
                    , "date": today
                    , "data": result
                };
                res.send(temp);
            }
        });
    }
    else {
        var temp = {
            "status": "False"
            , "date": today
        };
        res.send(temp);
    }
});
app.post('/editVuln', function (req, res) {
    uploadProof(req, res, function (err) {
        var vid = req.body.id;
        var pid = req.body.projectID;
        var vname = req.body.vulName;
        var apptype = req.body.appType;
        var vowasp =  req.body.owaspName;
        var vdetail =  req.body.vulDetail;
        var vrecommend =  req.body.vulRecommend;        
        var risk = req.body.risk;
        var severity = req.body.severity;
        var cvscore = req.body.cvscore;
        var cvtext = req.body.cvtext;
        var probability = req.body.probability;
        var remeffort = req.body.remeffort;
        var vector = req.body.vector;
        var occurrences = req.body.occurrences;
        var affcomp = req.body.affcomp;
        var retest = req.body.retest | "";
        var other = req.body.other | "";        
        
        if (err) {
            throw err;
        }
        else{
            if(pid != undefined && vname != undefined && vowasp != undefined){
                con.query("UPDATE `vulnerabilities` SET `pid`=?, `vname`=?, `vowasp`=?, `vdetail`=?, `vrecommend`=?, `risk`=?, `severity`=?, `cvscore`=?, `cvtext`=?, `probability`=?, `remeffort`=?, `vector`=?, `occurrences`=?, `affcomp`=?, `retest`=?, `other`=? WHERE `vid`=?", [pid, vname, vowasp, vdetail, vrecommend, risk, severity, cvscore, cvtext, probability, remeffort, vector, occurrences, affcomp, retest, other, vid], function (err, result) {
                    if (err) {
                        throw err;
                    }
                    else {                        
                        var vulidtemp = result.insertId;
                        var dataProof = [];             
                        for(i = 0; i< req.files.length; i++){
                            temp = [vid, req.files[i].filename];            
                            dataProof.push(temp);
                        }
                        console.log("Row Updated in Vulnerabilities");
                        if (req.files.length > 0 && result.affectedRows == 1) {                            
                            con.query("INSERT INTO `proofs` (`vid`, `path`) VALUES ?", [dataProof], function (err, result) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    if (result.affectedRows > 0) {
                                        console.log("Row Inserted in Proofs");
                                        var temp = {"status": "True", "date": today, "vid": vulidtemp};
                                        res.send(temp);
                                    }
                                    else {
                                        console.log("Failed : Row Inserted in Proofs");
                                        var temp = {"status": "False", "date": today};
                                        res.send(temp);
                                    }
                                }
                            });                            
                        }
                        else if(result.affectedRows == 1){
                            var temp = {"status": "True", "date": today, "vid": vulidtemp};
                            res.send(temp);
                        }
                        else {
                            console.log("Failed : Row Updated in Vulnerabilities");
                            var temp = {"status": "False", "date": today};
                            res.send(temp);
                        }
                    }
                });
            }
            else{
                var temp = {"status": "False", "date": today};
                res.send(temp);
            }
        }
    });    
});
app.post('/deleteVuln', function (req, res) {
    var vid =  req.body.id;    
    if(vid != undefined){
      con.query("DELETE FROM `vulnerabilities` WHERE `vid`=?", [vid], function (err, result) {
        if (err) {
            throw err;
        }
        else {
            if (result.affectedRows == 1) {
                con.query("DELETE FROM `proofs` WHERE `vid`=?", [vid], function (err, result) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log("Row Deleted in Vulnerabilities");
                        var temp = {"status": "True", "date": today};
                        res.send(temp);
                    }
                });
                
            }
            else {
                console.log("Failed : Row Deleted in Vulnerabilities");
                var temp = {"status": "False", "date": today};
                res.send(temp);
            }
        }
        });
    }
    else{
      var temp = {"status": "False", "date": today};
    res.send(temp);
    }
});

app.post('/deleteProof', function (req, res) {
    var path =  req.body.path;    
    if(path != undefined){
      con.query("DELETE FROM `proofs` WHERE `path`=?", [path], function (err, result) {
        if (err) {
            throw err;
        }
        else {
            if (result.affectedRows == 1) {
                console.log("Row Deleted in Proofs");
                var temp = {"status": "True", "date": today};
                res.send(temp);                
            }
            else {
                console.log("Failed : Row Deleted in Proofs");
                var temp = {"status": "False", "date": today};
                res.send(temp);
            }
        }
        });
    }
    else{
        var temp = {"status": "False", "date": today};
        res.send(temp);
    }
});

app.get('/count', function (req, res) {
    var owasp = 0;
    var vuln = 0;
    var project = 0;
    con.query("SELECT COUNT(*) as owasp FROM owasp", function (err, result) {
        if (err) {
            throw err;
        }
        else {            
            owasp = result[0].owasp;
            con.query("SELECT COUNT(*) as project FROM projects", function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    project = result[0].project;
                    con.query("SELECT COUNT(*) as vuln FROM vulnerabilities", function (err, result) {
                        if (err) {
                            throw err;
                        }
                        else {
                            vuln = result[0].vuln;
                            var temp = {"status": "True", "date": today, "data": {"owasp": owasp, "vuln": vuln, "project": project}};
                            res.send(temp);
                        }       
                    });
                }       
            });
        }       
    });
});

app.get('/download', function (req, res) {
    var filename = req.query['filename'];    
    var download_1 = __dirname + "\\public\\output\\" + filename + ".docx";
    var path1 = path.resolve(download_1);
    console.log(path1);
    res.setHeader('Content-disposition', 'attachment; filename=' + download_1);
    res.download(path1); // magic of download fuction    
});

app.all('*', function (req, res) {
    res.send("Bad Request");
})
app.listen(3000);