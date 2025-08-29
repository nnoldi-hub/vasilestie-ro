import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/colaborator/content/settings - Get all site settings
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMINISTRATOR' && session.user.role !== 'COLLABORATOR')) {
      return NextResponse.json(
        { error: 'Nu aveți permisiuni pentru această acțiune' },
        { status: 403 }
      );
    }

    // Get settings grouped by section
    const settings = await prisma.siteSettings.findMany({
      orderBy: [
        { section: 'asc' },
        { key: 'asc' }
      ]
    });

    // Group settings by section
    const groupedSettings: Record<string, Record<string, any>> = {};
    settings.forEach(setting => {
      if (!groupedSettings[setting.section]) {
        groupedSettings[setting.section] = {};
      }
      groupedSettings[setting.section][setting.key] = {
        value: setting.value,
        type: setting.type,
        label: setting.label,
        description: setting.description,
        updatedAt: setting.updatedAt
      };
    });

    return NextResponse.json({
      success: true,
      settings: groupedSettings
    });

  } catch (error) {
    console.error('Error getting site settings:', error);
    return NextResponse.json(
      { error: 'Failed to get site settings' },
      { status: 500 }
    );
  }
}

// POST /api/colaborator/content/settings - Update site settings
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMINISTRATOR' && session.user.role !== 'COLLABORATOR')) {
      return NextResponse.json(
        { error: 'Nu aveți permisiuni pentru această acțiune' },
        { status: 403 }
      );
    }

    const { section, settings } = await request.json();

    if (!section || !settings) {
      return NextResponse.json(
        { error: 'Secțiunea și setările sunt obligatorii' },
        { status: 400 }
      );
    }

    // Update or create settings
    const updatePromises = Object.entries(settings).map(async ([key, data]: [string, any]) => {
      return prisma.siteSettings.upsert({
        where: {
          section_key: {
            section,
            key
          }
        },
        update: {
          value: data.value,
          type: data.type || 'text',
          label: data.label || key,
          description: data.description || null,
          updatedBy: session.user.id
        },
        create: {
          section,
          key,
          value: data.value,
          type: data.type || 'text',
          label: data.label || key,
          description: data.description || null,
          updatedBy: session.user.id
        }
      });
    });

    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      message: 'Setările au fost actualizate cu succes'
    });

  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json(
      { error: 'Failed to update site settings' },
      { status: 500 }
    );
  }
}
