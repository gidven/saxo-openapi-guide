# Open-Source Repository for Saxo's OpenAPI Guide

**Available [here](https://gidven.github.io/saxo-openapi-guide/)**

## About

This repository contains documentation for Saxo's OpenAPI.

Based on MkDocs Material design.

## Get Started

Requirements:
1. Python 3.6+
2. Pip with `virtualenv` installed

To use this repositry locally, follow these steps:

1. Fork repo.
2. Clone into your machine.
3. Create local virtual environment in the root directory: `virtualenv venv`.
4. Activate venv: `.\venv\Script\activate` (Windows) or `source venv\bin\activate` (Linux/Mac).
5. Run `pip install -r requirements.txt` to grab required modules.
6. Run local server: `mkdocs serve`
7. Publish to github-pages branch: `mkdocs gh-deploy` (this will automatically set up pages for your repository)