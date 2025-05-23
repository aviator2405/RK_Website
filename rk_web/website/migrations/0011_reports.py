# Generated by Django 5.0.6 on 2025-05-03 12:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0010_alter_order_item_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='reports',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.IntegerField(max_length=10)),
                ('email', models.EmailField(max_length=254)),
                ('message', models.CharField(max_length=500)),
                ('error_image_url', models.URLField()),
                ('firm_info', models.ForeignKey(default=None, on_delete=django.db.models.deletion.SET_DEFAULT, to='website.firm_info')),
            ],
        ),
    ]
