import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import numpy as np

fig, ax = plt.subplots(figsize=(20, 14))
ax.set_xlim(0, 20)
ax.set_ylim(-0.5, 14.5)
ax.axis('off')

ax.text(10, 13.5, 'Modele Logique de Donnees (MLD) --- SaaS Directory',
        ha='center', va='center', fontsize=14, fontweight='bold')
ax.text(10, 13.1, 'Fleches : FK vers PK  |  Traits gris = relations entre tables',
        ha='center', va='center', fontsize=10, color='#666666')

auth_c = '#D6EAF8'
ann_c  = '#D5F5E3'
soc_c  = '#FCF3CF'
eng_c  = '#FADBD8'

# Table definitions: (x, y, color, name, [PK fields], [FK fields])
tables = {
    'user':                   (3.0, 10.0, auth_c, ['id: PK'], []),
    'profile':                (1.5,  7.5, auth_c, ['id: PK'], ['userId: FK']),
    'session':                (4.5,  7.5, auth_c, ['id: PK'], ['userId: FK']),
    'account':                (1.5,  5.0, auth_c, ['id: PK'], ['userId: FK']),
    'verification':           (4.5,  5.0, auth_c, ['id: PK'], []),

    'launch':                 (8.5, 11.0, ann_c,  ['id: PK'], ['makerId: FK']),
    'category':               (6.0,  9.0, ann_c,  ['id: PK'], []),
    'plan':                   (11.0, 9.0, ann_c,  ['id: PK'], []),
    'launchImage':            (6.0,  6.5, ann_c,  ['id: PK'], ['launchId: FK']),
    'comment':                (11.0, 6.5, ann_c,  ['id: PK'], ['launchId: FK', 'userId: FK']),

    'post':                   (8.5,  4.0, soc_c,  ['id: PK'], ['userId: FK', 'launchId: FK']),
    'conversation':           (6.0,  2.5, soc_c,  ['id: PK'], []),
    'message':                (11.0, 2.5, soc_c,  ['id: PK'], ['conversationId: FK', 'senderId: FK']),
    'conversationParticipant':(6.0,  0.5, soc_c,  ['id: PK'], ['conversationId: FK', 'userId: FK']),
    'postComment':            (11.0, 0.5, soc_c,  ['id: PK'], ['postId: FK', 'userId: FK']),

    'upvote':                 (15.0, 10.0, eng_c,  ['id: PK'], ['userId: FK', 'launchId: FK']),
    'notification':           (13.5, 7.5, eng_c,  ['id: PK'], ['userId: FK']),
    'launchCategory':         (16.5, 7.5, eng_c,  ['id: PK'], ['launchId: FK', 'categoryId: FK']),
    'subscription':           (13.5, 5.0, eng_c,  ['id: PK'], ['userId: FK', 'planId: FK']),
    'postUpvote':             (16.5, 5.0, eng_c,  ['id: PK'], ['userId: FK', 'postId: FK']),
}

box_w = 2.6
box_h = 1.4

def draw_table(ax, x, y, color, name, pks, fks, width=box_w, height=box_h):
    box = FancyBboxPatch((x - width/2, y - height/2), width, height,
                         boxstyle='round,pad=0.02,rounding_size=0.1',
                         facecolor=color, edgecolor='black', linewidth=1.5, alpha=0.95)
    ax.add_patch(box)
    ax.text(x, y + height/2 - 0.22, name, ha='center', va='center',
            fontsize=9, fontweight='bold')
    ax.plot([x - width/2 + 0.08, x + width/2 - 0.08], 
            [y + height/2 - 0.38, y + height/2 - 0.38], 'k-', linewidth=0.8)
    line_h = 0.17
    start_y = y + height/2 - 0.55
    for i, pk in enumerate(pks):
        ax.text(x, start_y - i*line_h, pk.replace(': PK', ' (PK)'), 
                ha='center', va='center', fontsize=7.5, fontweight='bold', color='#1A5276')
    offset = len(pks) * line_h + 0.05
    for i, fk in enumerate(fks):
        ax.text(x, start_y - offset - i*line_h, fk.replace(': FK', ' (FK)'), 
                ha='center', va='center', fontsize=7.5, style='italic', color='#7D3C98')
    return x, y, width, height

positions = {}
for name, (x, y, color, pks, fks) in tables.items():
    draw_table(ax, x, y, color, name, pks, fks)
    positions[name] = (x, y)

arrows = [
    ('profile', 'user', ['userId']),
    ('session', 'user', ['userId']),
    ('account', 'user', ['userId']),
    ('launchImage', 'launch', ['launchId']),
    ('comment', 'launch', ['launchId']),
    ('message', 'conversation', ['conversationId']),
    ('conversationParticipant', 'conversation', ['conversationId']),
    ('postComment', 'post', ['postId']),
    ('launchCategory', 'launch', ['launchId']),
    ('subscription', 'plan', ['planId']),
    ('postUpvote', 'post', ['postId']),
    ('launch', 'user', ['makerId']),
    ('comment', 'user', ['userId']),
    ('post', 'user', ['userId']),
    ('message', 'user', ['senderId']),
    ('conversationParticipant', 'user', ['userId']),
    ('postComment', 'user', ['userId']),
    ('upvote', 'user', ['userId']),
    ('notification', 'user', ['userId']),
    ('subscription', 'user', ['userId']),
    ('upvote', 'launch', ['launchId']),
    ('post', 'launch', ['launchId']),
    ('launchCategory', 'category', ['categoryId']),
]

def draw_colored_arrow(ax, x1, y1, x2, y2, color, rad=0.1):
    style = 'arc3,rad=%.2f' % rad
    arrow = FancyArrowPatch((x1, y1), (x2, y2),
                           arrowstyle='->', mutation_scale=12,
                           color=color, linewidth=1.3,
                           connectionstyle=style, alpha=0.75)
    ax.add_patch(arrow)

# Domain arrow colors (darker versions for visibility)
arrow_colors = {
    'user': '#2E5984', 'profile': '#2E5984', 'session': '#2E5984', 'account': '#2E5984', 'verification': '#2E5984',
    'launch': '#1E8449', 'category': '#1E8449', 'plan': '#1E8449', 'launchImage': '#1E8449', 'comment': '#1E8449',
    'post': '#B7950B', 'conversation': '#B7950B', 'message': '#B7950B', 'conversationParticipant': '#B7950B', 'postComment': '#B7950B',
    'upvote': '#A93226', 'notification': '#A93226', 'launchCategory': '#A93226', 'subscription': '#A93226', 'postUpvote': '#A93226',
}

rad_vals = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6]
for i, (src, dst, labels) in enumerate(arrows):
    x1, y1 = positions[src]
    x2, y2 = positions[dst]
    rad = rad_vals[i % len(rad_vals)]
    color = arrow_colors.get(src, '#555555')
    draw_colored_arrow(ax, x1, y1, x2, y2, color, rad=rad)

# Legend
leg_x = 18.5
leg_y = 2.0
ax.text(leg_x, leg_y + 0.9, 'Legende', ha='center', va='center', fontsize=9, fontweight='bold')
ax.add_patch(FancyBboxPatch((leg_x-0.8, leg_y+0.45), 1.6, 0.32, boxstyle='round,pad=0.02,rounding_size=0.05',
                            facecolor=auth_c, edgecolor='black', linewidth=1))
ax.text(leg_x, leg_y+0.61, 'Auth', ha='center', va='center', fontsize=8)
ax.add_patch(FancyBboxPatch((leg_x-0.8, leg_y+0.05), 1.6, 0.32, boxstyle='round,pad=0.02,rounding_size=0.05',
                            facecolor=ann_c, edgecolor='black', linewidth=1))
ax.text(leg_x, leg_y+0.21, 'Annuaire', ha='center', va='center', fontsize=8)
ax.add_patch(FancyBboxPatch((leg_x-0.8, leg_y-0.35), 1.6, 0.32, boxstyle='round,pad=0.02,rounding_size=0.05',
                            facecolor=soc_c, edgecolor='black', linewidth=1))
ax.text(leg_x, leg_y-0.19, 'Social', ha='center', va='center', fontsize=8)
ax.add_patch(FancyBboxPatch((leg_x-0.8, leg_y-0.75), 1.6, 0.32, boxstyle='round,pad=0.02,rounding_size=0.05',
                            facecolor=eng_c, edgecolor='black', linewidth=1))
ax.text(leg_x, leg_y-0.59, 'Engagement', ha='center', va='center', fontsize=8)
ax.text(leg_x, leg_y - 1.15, '---  FK vers PK', ha='center', va='center', fontsize=8, color='#555555')

plt.tight_layout()
plt.savefig('mld_graphical.png', dpi=200, bbox_inches='tight', facecolor='white')
print('mld_graphical done')
