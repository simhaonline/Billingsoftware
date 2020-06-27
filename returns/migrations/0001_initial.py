# Generated by Django 2.1.7 on 2019-03-27 08:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='returned_sales_prod',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sales_product_id', models.IntegerField()),
                ('sales_returned_invoice_id_ref', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='sales_returned',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sale_amount_return', models.CharField(max_length=50)),
                ('sale_return_date', models.DateField(blank=True, default=datetime.datetime(2019, 3, 27, 14, 9, 57, 656018))),
                ('sale_return_transaction_mode', models.CharField(max_length=50)),
                ('sale_return_cash_account', models.CharField(max_length=50)),
                ('sales_returned_invoice', models.IntegerField()),
                ('sales_invoice_ref', models.IntegerField()),
            ],
            options={
                'verbose_name_plural': 'sales_returned',
            },
        ),
    ]