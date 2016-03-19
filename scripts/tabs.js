$(function() 
{ 
$(".tab_content").hide(); 
for (i=0;i<=$("ul.tabs li").length-1;i++) 
{ 
if ($("div.tab_container div.tab_content")[i].children.length!=0)
$("ul.tabs li")[i].click(function() {
$("ul.tabs li").removeClass("active"); 
$(this).addClass("active"); 
$(".tab_content").hide(); 
var activeTab = $(this).find("a").attr("href"); 
$(activeTab).fadeIn(0); 
return false; 
}); 
} 
hash = window.location.hash; 
elements = $('a[href="' + hash + '"]'); 

if (elements.length === 0) 
{ 
$("ul.tabs li:first").addClass("active").show(); 
$(".tab_content:first").show(); 
} 
else 
{ 
elements.click(); 
} 
});