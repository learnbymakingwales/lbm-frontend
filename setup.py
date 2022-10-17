import glob
import os

from setuptools import setup, find_packages

components = []
directories_jinja = glob.glob("lbm_frontend/**/**/*.jinja", recursive=True)

for directory in directories_jinja:
    components.append(
        os.path.relpath(os.path.dirname(directory), "lbm_frontend") + "/*.jinja"
    )

setup(
    name="lbm-frontend",
    version="0.2.8",
    author="The learn by making team",
    description="Reusable frontend code for learn by making projects",
    license="MIT",
    packages=find_packages(exclude=["tests"]),
    package_data={"lbm-frontend": components},
    python_requires=">=3.5",
    install_requires=["jinja2"],
    include_package_data=True,
    extras_require={"testing": ["pytest", "flake8", "black"]},
)
