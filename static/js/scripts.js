---
---
{%- if site.develop -%}
    {%- capture site_url -%}
    file://{{- site.destination -}}
    {%- endcapture -%}
    {%- assign static_url = site_url -%}
{%- else -%}
    {%- assign site_url = site.url -%}
    {%- assign static_url = site.static_url -%}
{%- endif -%}

{%- if site.develop -%}
    {% include js/full/jquery.js %}
    {% include js/full/moment.js %}
    {% include js/full/fuse.js %}
    {% include js/full/lib.js %}
    {% include js/full/vars.js %}
    {% include js/full/vendor.js %}
    {% include js/full/init.js %}
    {% include js/full/header.js %}
    {% include js/full/sidebar.js %}
    {% include js/full/frontpage.js %}
    {% include js/full/post.js %}
    {% include js/full/page.js %}
{%- else -%}
    {%- include js/min/jquery.js -%}
    {%- include js/min/moment.js -%}
    {%- include js/min/fuse.js -%}
    {%- include js/min/lib.js -%}
    {%- include js/min/vars.js -%}
    {%- include js/min/vendor.js -%}
    {%- include js/min/init.js -%}
    {%- include js/min/header.js -%}
    {%- include js/min/sidebar.js -%}
    {%- include js/min/frontpage.js -%}
    {%- include js/min/post.js -%}
    {%- include js/min/page.js -%}
{%- endif -%}