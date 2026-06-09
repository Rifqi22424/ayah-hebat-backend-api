const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const DEFAULT_ZONE_NAME = "JAWA BARAT";
const DEFAULT_BRANCH_NAME = "Sukabumi";

async function fixEmptyZoneAndBranch() {
	try {
		const zone = await prisma.zone.findUnique({
			where: { name: DEFAULT_ZONE_NAME },
		});

		if (!zone) {
			console.log(`Default zone not found: ${DEFAULT_ZONE_NAME}`);
			return;
		}

		const branch = await prisma.branch.findFirst({
			where: {
				name: DEFAULT_BRANCH_NAME,
				zoneId: zone.id,
			},
		});

		if (!branch) {
			console.log(
				`Default branch not found: ${DEFAULT_BRANCH_NAME} (${DEFAULT_ZONE_NAME})`,
			);
			return;
		}

		const usersToFix = await prisma.user.findMany({
			where: {
				zoneId: null,
				branchId: null,
			},
			select: {
				id: true,
			},
		});

		if (usersToFix.length === 0) {
			console.log("All users already have zone and branch.");
			return;
		}

		const result = await prisma.user.updateMany({
			where: {
				id: {
					in: usersToFix.map((user) => user.id),
				},
			},
			data: {
				zoneId: zone.id,
				branchId: branch.id,
			},
		});

		console.log(
			`Fixed ${result.count} user(s) with default zone ${DEFAULT_ZONE_NAME} and branch ${DEFAULT_BRANCH_NAME}.`,
		);
	} catch (error) {
		console.error("Error fixing empty zone and branch:", error);
	} finally {
		await prisma.$disconnect();
	}
}

module.exports = { fixEmptyZoneAndBranch };
