# Generated by Django 2.2.3 on 2019-08-12 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0008_auto_20190809_1911'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='final_price',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]