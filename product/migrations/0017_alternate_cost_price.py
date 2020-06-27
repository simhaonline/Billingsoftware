# Generated by Django 2.2.3 on 2019-10-06 06:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0016_auto_20190819_1910'),
    ]

    operations = [
        migrations.CreateModel(
            name='alternate_cost_price',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_ref_id', models.IntegerField()),
                ('unit_type_id', models.IntegerField()),
                ('product_price', models.CharField(max_length=50)),
                ('product_cost', models.IntegerField()),
            ],
            options={
                'verbose_name_plural': 'alternate_cost_price',
            },
        ),
    ]