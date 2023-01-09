brew install gprof2dot

# To prep ERD
python manage.py graph_models -a > erd.dot
python manage.py graph_models -a > erd.dot && python manage.py graph_models --pydot -a -g -o erd.png