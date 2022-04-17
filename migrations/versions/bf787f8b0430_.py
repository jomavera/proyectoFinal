"""empty message

Revision ID: bf787f8b0430
Revises: 9f3d450686f6
Create Date: 2022-04-13 23:46:38.258278

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bf787f8b0430'
down_revision = '9f3d450686f6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('eventos', 'comuna_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('eventos', 'comuna_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
