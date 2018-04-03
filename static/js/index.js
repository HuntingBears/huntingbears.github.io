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
HB.index = {
{%- for post in site.posts -%}
    {%- capture keywords -%}
        {%- for tag in post.tags -%}
            {{ tag | downcase | replace: 'ñ', 'n' | replace: 'á', 'a' | replace: 'é', 'e' | replace: 'í', 'i' | replace: 'ó', 'o' | replace: 'ú', 'u' | replace: ' ', '-' | replace: '.', ' ' | uri_escape }},
        {%- endfor -%}
        {%- for category in post.categories -%}
        {{ category | downcase | replace: 'ñ', 'n' | replace: 'á', 'a' | replace: 'é', 'e' | replace: 'í', 'i' | replace: 'ó', 'o' | replace: 'ú', 'u' | replace: ' ', '-' | replace: '.', ' ' | uri_escape }}
        {%- unless forloop.last -%}, {%- endunless -%}
        {%- endfor -%}
    {%- endcapture -%}

    {%- if site.develop -%}

    "{{ post.article_id }}": {
        "title": "{{ post.title | escape }}",
        "description": "{{ post.description | escape }}",
        "keywords": "{{ keywords }}",
        "image": "{{ static_url }}{{ post.image | escape }}",
        "url": "{{ site_url }}{{ post.url }}",
        "date": "{{ post.date | date_to_xmlschema }}"
    }{% unless forloop.last %},{% endunless %}

    {%- else -%}

    "{{ post.article_id }}":{
        "title":"{{ post.title | escape }}",{{- '' -}}
        "description":"{{ post.description | escape }}",{{- '' -}}
        "keywords":"{{ keywords }}",{{- '' -}}
        "image":"{{ static_url }}{{ post.image | escape }}",{{- '' -}}
        "url":"{{ site_url }}{{ post.url }}",{{- '' -}}
        "date":"{{ post.date | date_to_xmlschema }}"{{- '' -}}
    }{%- unless forloop.last -%},{%- endunless -%}

    {%- endif -%}

{%- endfor -%}
};