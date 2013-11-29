---
layout: page
title: Catalog
---
<div id="wiki">
    <h1>Hit Here to See My Blog</h1>
    <ul class="hide">
        <ul class="artical-list">
        {% for post in site.categories.blog%}
            <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endfor %}
        </ul>
    </ul>
    
    <h1>Hit Here to See My Opinion</h1>
    <ul class="hide">
        <ul class="artical-list">
        {% for post in site.categories.opinion%}
            <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endfor %}
        </ul>
    </ul>
    
    <h1>Hit Here to See My Project</h1>
    <ul class="hide">
        <ul class="artical-list">
        {% for post in site.categories.project%}
            <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endfor %}
        </ul>
    </ul>
      
</div>
<script type="text/javascript">
    $(document).ready(function(){
        $('#content a').each(function(index,element){
            var href = $(this).attr('href');
            if(href.indexOf('#') == 0){
            }else if ( href.indexOf('/') == 0 || href.toLowerCase().indexOf('yijia2413.github.io')>-1 ){
                $(this).attr('target','_blank');
            }else{
                $(this).attr('target','_blank');
                $(this).addClass('external');
            }
        });
        $('body').delegate('h2','click',function(e){
            e.preventDefault();
            $(this).next('ul').toggle();
        });
    });
</script>
